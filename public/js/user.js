// var Toast = Swal.mixin({
//       toast: true,
//       position: 'top-end',
//       showConfirmButton: false,
//       timer: 3000
//     });
$(document).ready(function(){
    user_datatable();
})
function user_datatable() {
    $('#user_datatable').DataTable({
        ajax: {
            url: '/users.txt',
            dataSrc: '',
            dataFilter: function(data){
              var json = jQuery.parseJSON( data );
              for (var i = 0; i < json.length; i++) {
                var action = '<button class="btn btn-success mr-2 edit" data-id="'+ json[i].id +'">Edit</button>';
                action += '<button class="btn btn-danger delete" data-id="'+ json[i].id +'">Delete</button>'
                json[i].action = action;
              }
              return JSON.stringify( json );
            },
        },
        columns: [
          { "data": "id"},
          { "data": "name"},
          { "data": "email" },
          { "data": "action" },
        ],
        deferRender: true,
        order: [[0, 'desc']],
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
    });   
}

$('#add_user').click(function(){
    $('#name').val('');
    $('#email').val('');
    $('.error').html('');
    $('#add_user_modal').modal();
});

$(document).on('submit', '#add_user_form',function(){
    event.preventDefault();
    var formValues = $(this).serializeArray();
    $('.pageloader').fadeIn();
    $.ajax({
        type:"post",
        url:'/users',
        data: formValues,
        success: function(response){
            $('.pageloader').fadeOut();
            if (response == 'success') {
                $('#user_datatable').dataTable().fnDestroy();
                user_datatable();
                $('#add_user_modal').modal('hide');
                toastr.success('User created successfully.');
            }
        },
        error: function(error){
            $('.pageloader').fadeOut();
            if( error.status === 422 ) {
                var errors = $.parseJSON(error.responseText);
                $(document).find('span.error').text('');
                $.each(errors.errors, function (key, val) {
                    key = key.split(".");
                    key = key.join("\\.");
                    $("#" + key + "_error").text(val[0]);
                });
                // $.toaster({ priority : 'danger', title : 'Error', message : 'Please correct following error.'});
                toastr.error('Please correct following error.');
                // Toast.fire({
                //   icon: 'error',
                //   title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
                // })
            }
            if ( error.status == 500 ) {
                // $.toaster({ priority : 'danger', title : 'Error', message : error.responseText});
                // Toast.fire({
                //   icon: 'error',
                //   title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
                // })
                toastr.error(error.responseText);
            }
        }
    });
});

$(document).on('click', '.edit', function(){
    event.preventDefault();
    var id = $(this).data('id');
    if (id) {
        $.ajax({
            type:"get",
            url:'/users/'+id+'/edit',
            success: function(response){
                $('.pageloader').fadeOut();
                $('.error').html('');
                $('#user_id').val(response.id);
                $('#edit_name').val(response.name);
                $('#edit_email').val(response.email);
                $('#edit_user_modal').modal();
            },
            error: function(error){
                $('.pageloader').fadeOut();
                if ( error.status == 500 ) {
                    toastr.error(error.responseText);
                }
            }
        });
    }
});

$(document).on('submit', '#edit_user_form',function(){
    event.preventDefault();
    var formValues = $(this).serializeArray();
    $('.pageloader').fadeIn();
    $.ajax({
        type:"put",
        url:'/users/'+$('#user_id').val(),
        data: formValues,
        success: function(response){
            $('.pageloader').fadeOut();
            if (response == 'success') {
                $('#user_datatable').dataTable().fnDestroy();
                user_datatable();
                $('#edit_user_modal').modal('hide');
                toastr.success('User updated successfully.');
            }
        },
        error: function(error){
            $('.pageloader').fadeOut();
            if( error.status === 422 ) {
                var errors = $.parseJSON(error.responseText);
                $(document).find('span.error').text('');
                $.each(errors.errors, function (key, val) {
                    key = key.split(".");
                    key = key.join("\\.");
                    $("#edit_" + key + "_error").text(val[0]);
                });
                // $.toaster({ priority : 'danger', title : 'Error', message : 'Please correct following error.'});
                toastr.error('Please correct following error.');
                // Toast.fire({
                //   icon: 'error',
                //   title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
                // })
            }
            if ( error.status == 500 ) {
                // $.toaster({ priority : 'danger', title : 'Error', message : error.responseText});
                // Toast.fire({
                //   icon: 'error',
                //   title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
                // })
                toastr.error(error.responseText);
            }
        }
    });
});

$(document).on('click', '.delete', function(){
    event.preventDefault();
    var id = $(this).data('id');
    if (id) {
        $.ajax({
            type:"DELETE",
            url:'/users/'+id,
            data: {'_token': $('meta[name="csrf-token"]').attr('content')},
            success: function(response){
                $('.pageloader').fadeOut();
                if(response == 'success'){
                    $('#user_datatable').dataTable().fnDestroy();
                    user_datatable();
                    toastr.success('User deleted successfully.');
                }
            },
            error: function(error){
                $('.pageloader').fadeOut();
                if ( error.status == 500 ) {
                    toastr.error(error.responseText);
                }
            }
        });
    }
});
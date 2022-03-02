(()=>{"use strict";var e="#specializationsTable";$(document).ready((function(){var a=$(e).DataTable({processing:!0,serverSide:!0,searchDelay:500,language:{lengthMenu:"Show _MENU_"},order:[[0,"asc"]],ajax:{url:route("specializations.index")},columnDefs:[{targets:[1],orderable:!1,className:"text-center",width:"8%"}],columns:[{data:"name",name:"name"},{data:function(e){var a=[{id:e.id}];return prepareTemplateRender("#specializationsTemplate",a)},name:"id"}]});handleSearchDatatable(a)})),$(document).on("click","#createSpecialization",(function(){$("#createSpecializationModal").modal("show").appendTo("body")})),$("#createSpecializationModal").on("hidden.bs.modal",(function(){resetModalForm("#createSpecializationForm","#createSpecializationValidationErrorsBox")})),$("#editSpecializationModal").on("hidden.bs.modal",(function(){resetModalForm("#editSpecializationForm","#editSpecializationValidationErrorsBox")})),$(document).on("click",".edit-btn",(function(e){!function(e){$.ajax({url:route("specializations.edit",e),type:"GET",success:function(e){$("#specializationID").val(e.data.id),$("#editName").val(e.data.name),$("#editSpecializationModal").modal("show")}})}($(e.currentTarget).data("id"))})),$(document).on("submit","#createSpecializationForm",(function(a){a.preventDefault(),$.ajax({url:route("specializations.store"),type:"POST",data:$(this).serialize(),success:function(a){a.success&&(displaySuccessMessage(a.message),$("#createSpecializationModal").modal("hide"),$(e).DataTable().ajax.reload(null,!1))},error:function(e){displayErrorMessage(e.responseJSON.message)}})})),$(document).on("submit","#editSpecializationForm",(function(a){a.preventDefault();var i=$(this).serialize(),t=$("#specializationID").val();$.ajax({url:route("specializations.update",t),type:"PUT",data:i,success:function(a){$("#editSpecializationModal").modal("hide"),displaySuccessMessage(a.message),$(e).DataTable().ajax.reload(null,!1)},error:function(e){displayErrorMessage(e.responseJSON.message)},complete:function(){}})})),$(document).on("click",".delete-btn",(function(a){var i=$(a.currentTarget).data("id");deleteItem(route("specializations.destroy",i),e,"Specialization")}))})();
(()=>{"use strict";var e="#staffTable";$(document).ready((function(){var a=$(e).DataTable({processing:!0,serverSide:!0,searchDelay:500,language:{lengthMenu:"Show_MENU_"},order:[[0,"asc"]],ajax:{url:route("staff.index")},columnDefs:[{targets:[0],width:"50%"},{targets:[2],orderable:!1,searchable:!1},{targets:[3],orderable:!1,className:"text-center",width:"8%"}],columns:[{data:function(e){return'<div class="symbol symbol-circle symbol-50px overflow-hidden me-3">\n                        <div class="symbol-label">\n                            <img src="'.concat(e.profile_image,'" alt=""\n                                 class="w-100 object-cover">\n                        </div> \n                    </div>\n                    <div class="d-inline-block align-top">\n                        <a href="').concat(route("staff.show",e.id),'"\n                           class="text-primary-800 mb-1 d-block">').concat(e.full_name,'</a>\n                           <span class="d-block">').concat(e.email,"</span>\n                    </div>")},name:"full_name"},{data:"role_name",name:"role_name"},{data:function(e){return'<div class="form-check form-switch form-check-custom form-check-solid justify-content-center">\n                            <input class="form-check-input h-20px w-30px email-verified" data-id="'.concat(e.id,'" type="checkbox" value=""\n                               ').concat(e.email_verified_at?"checked":"","/>\n                            </div>")},name:"id"},{data:function(e){var a=[{id:e.id,editUrl:route("staff.edit",e.id)}];return prepareTemplateRender("#actionsTemplates",a)},name:"id"}]});handleSearchDatatable(a)})),$(document).on("click",".delete-btn",(function(a){var t=$(a.currentTarget).data("id");deleteItem(route("staff.destroy",t),e,"Staff")})),$(document).on("change",".email-verified",(function(a){var t=$(a.currentTarget).data("id"),c=$(this).is(":checked")?1:0;$.ajax({type:"POST",url:route("emailVerified"),data:{id:t,value:c},success:function(a){$(e).DataTable().ajax.reload(null,!1),displaySuccessMessage(a.message)}})}))})();
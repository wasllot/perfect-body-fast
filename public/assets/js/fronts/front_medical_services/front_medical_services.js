(()=>{"use strict";var e="#frontMedicalServicesTable",t=$(e).DataTable({processing:!0,serverSide:!0,searchDelay:500,language:{lengthMenu:"Show _MENU_"},order:[[0,"asc"]],ajax:{url:route("front-medical-services.index")},columnDefs:[{targets:[2],orderable:!1,className:"text-center",width:"8%"}],columns:[{data:"title",name:"title"},{data:"short_description",name:"short_description"},{data:function(e){var t=[{id:e.id,editUrl:route("front-medical-services.edit",e.id)}];return prepareTemplateRender("#actionsTemplates",t)},name:"id"}]});handleSearchDatatable(t),$(document).on("click",".delete-btn",(function(t){var a=$(t.currentTarget).data("id");deleteItem(route("front-medical-services.destroy",a),e,"Front Medical Service")}))})();
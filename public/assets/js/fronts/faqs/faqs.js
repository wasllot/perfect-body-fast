(()=>{"use strict";var e="#faqsTable",a=$(e).DataTable({processing:!0,serverSide:!0,searchDelay:500,language:{lengthMenu:"Show _MENU_"},order:[[1,"asc"]],ajax:{url:route("faqs.index")},columnDefs:[{targets:[2],orderable:!1,className:"text-center",width:"8%"}],columns:[{data:"question",name:"question"},{data:"answer",name:"answer"},{data:function(e){var a=[{id:e.id,editUrl:route("faqs.edit",e.id)}];return prepareTemplateRender("#actionsTemplates",a)},name:"id"}]});handleSearchDatatable(a),$(document).on("click",".delete-btn",(function(a){var t=$(a.currentTarget).data("id");deleteItem(route("faqs.destroy",t),e,"FAQ")}))})();
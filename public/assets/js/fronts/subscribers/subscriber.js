(()=>{"use strict";var e="#subscribersTable";$(document).ready((function(){var a=$(e).DataTable({processing:!0,serverSide:!0,searchDelay:500,language:{lengthMenu:"Show _MENU_"},order:[[0,"asc"]],ajax:{url:route("subscribers.index")},columnDefs:[{targets:[1],orderable:!1,searchable:!1,className:"text-center",width:"8%"}],columns:[{data:"email",name:"email"},{data:function(e){var a=[{id:e.id}];return prepareTemplateRender("#subscriberActionTemplate",a)},name:"id"}]});handleSearchDatatable(a)})),$(document).on("click",".delete-btn",(function(){var a=$(this).attr("data-id");deleteItem(route("subscribers.destroy",a),e,"Subscriber")}))})();
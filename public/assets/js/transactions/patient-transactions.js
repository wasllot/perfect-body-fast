(()=>{"use strict";$(document).ready((function(){var a=$("#transactionsTable").DataTable({processing:!0,serverSide:!0,searchDelay:500,language:{lengthMenu:"Show _MENU_"},order:[[0,"desc"]],ajax:{url:route("patients.transactions")},columnDefs:[{targets:[0],width:"50%"},{targets:[1],width:"18%"},{targets:[3],orderable:!1,searchable:!1,className:"text-center",width:"8%"}],columns:[{data:function(a){return'<span class="badge badge-light-info">'.concat(moment.parseZone(a.created_at).format("Do MMM, Y h:mm A"),"</span>")},name:"created_at"},{data:function(a){return a.type==manuallyMethod?manually:a.type==stripeMethod?stripe:a.type==paystckMethod?paystck:a.type==paypalMethod?paypal:a.type==razorpayMethod?razorpay:a.type==authorizeMethod?authorize:a.type==paytmMethod?paytm:""},name:"type"},{data:function(a){return currencyIcon+" "+getFormattedPrice(a.amount)},name:"amount"},{data:function(a){var t=[{id:a.id,showUrl:route("patients.transactions.show",a.id)}];return prepareTemplateRender("#transactionsTemplate",t)},name:"id"}]});handleSearchDatatable(a)}))})();
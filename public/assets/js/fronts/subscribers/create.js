(()=>{"use strict";$(document).on("submit","#subscribeForm",(function(e){e.preventDefault(),$.ajax({url:route("subscribe.store"),type:"POST",data:$(this).serialize(),success:function(e){e.success&&(toastr.success(e.message),$("#subscribeForm")[0].reset(),setTimeout((function(){location.reload()}),1200))},error:function(e){toastr.error(e.responseJSON.message),$("#subscribeForm")[0].reset()},complete:function(){}})}))})();
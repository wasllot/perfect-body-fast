(()=>{"use strict";$(document).ready((function(){var e=totalPermissions-1,c=$(".permission:checked").length;1==isEdit&&(c===e?$("#checkAllPermission").prop("checked",!0):$("#checkAllPermission").prop("checked",!1))})),$(document).on("click","#checkAllPermission",(function(){$("#checkAllPermission").is(":checked")?$(".permission").each((function(){$(this).prop("checked",!0)})):$(".permission").each((function(){$(this).prop("checked",!1)}))})),$(document).on("click",".permission",(function(){$(".permission:checked").length===totalPermissions-1?$("#checkAllPermission").prop("checked",!0):$("#checkAllPermission").prop("checked",!1)}))})();
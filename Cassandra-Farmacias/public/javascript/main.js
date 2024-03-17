$(document).ready(function () {
  $(".borrarfarmacia").on("click", borrarFarmacia);
});

function borrarFarmacia(event) {
  event.preventDefault();

  const confirmation = confirm("Estas seguro, que desea eliminar?");

  if (confirmation) {
    $.ajax({
      type: "DELETE",
      url: "/farmacia/" + $(".borrarfarmacia").data("idfarmacia"),
    }).done(function (response) {
      window.location.replace("/");
    });
  } else {
    return false;
  }
}

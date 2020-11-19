$(function () {
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $(".carousel").carousel({
      internal: 100
    });
    $('#contacto').on('show.bs.modal', function(e) {
      console.log('el contacto esta mostrando');
      $('#contactoBtn').removeClass('btn-outline-success');
      $('#contactoBtn').addClass('btn-primary');
      $('#contactoBtn').prop('disabled', true);
    });
    $('#contacto').on('shown.bs.modal', function(e) {
      console.log('el contacto se mostró');
    });
    $('#contacto').on('hide.bs.modal', function(e) {
      console.log('el contacto se oculta');
    });
    $('#contacto').on('hidden.bs.modal', function(e) {
      console.log('el contacto se ocultó');
      $('#contactoBtn').removeClass('btn-primary');
      $('#contactoBtn').addClass('btn-outline-success');
      $('#contactoBtn').prop('disabled', false);
    });
  });
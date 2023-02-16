$(document).ready(function() {
    var colors = ['#00ffff', '#ff00ff', '#00ff00']; // Array com as cores a serem utilizadas
    var currentColor = 0; // Índice da cor atual
    
    function changeBackground() {
      $('body').animate({backgroundColor: colors[currentColor]}, 100, function() {
        currentColor = (currentColor + 1) % colors.length; // Atualiza o índice da cor atual
        changeBackground(); // Chama a função novamente
      });
    }
    
    changeBackground(); // Inicia o loop infinito
  });
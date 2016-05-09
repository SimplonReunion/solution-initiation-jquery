//When the DOM is ready, we add the event
$(document).ready(function(){
  //Add the event to load the cars list
  $('button').click(function(evt){
    loadCars();
  });

  //Add the event to send the form when we click on the submit button
  $('form').submit(function(evt){
    evt.preventDefault();
  });
});

/**
 * Delete a car
 * @param  {String} id of the car to delete
 */
function deleteCar(id) {
  $.ajax({
     url : 'http://127.0.0.1:8000/cars/delete/'+id, // The target ressource
     type : 'GET', // the request type
     dataType : 'json',
     success : function (message, statut){
       $('.list-cars').empty();
       loadCars();
     }
   });
}

/**
 * Load the cars list
 */
function loadCars(){
  $.ajax({
     url : 'http://127.0.0.1:8000/cars', // The target ressource
     type : 'GET', // the request type
     dataType : 'json',
     success : function (carsData, statut){
       //Construct cars list
       for (var i = 0; i < carsData.length; i++) {
         var car = carsData[i];

         //translate the car.available boolean value to a text value -> "Disponible" or "Indisponible"
         var available = "disponible";
         if(car.available === false){
           available = "indisponible";
         }

         //Concat the car data
         var description = car.make +' '+ car.model +', '+ car.color+', '+car.price+'€ ,'+ available ;

         //Add the button delete. When we click on the button it calls the function deleteCar with the right id
         description += '<button class="btn btn-warning" onclick="deleteCar(\''+car.id+'\');">supprimer</button>'

         //Put the car description (and the button) in the HTML.
         $('.list-cars').append('<li>'+ description + '</li>');
       }
     }
  });
}

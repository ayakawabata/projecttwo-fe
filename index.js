document.addEventListener("DOMContentLoaded", function(){
console.log('Project2 loaded');

  var url = 'https://frozen-woodland-57951.herokuapp.com';
  var flashcard  = [];
// search words by category
  $('#submit').click(function(e) {
    e.preventDefault();
    var userinput = $('#category').val();
    console.log("user input: ", userinput);
    while (userinput.length === 0){
      alert("Please select");
      return false;
    }

    var data = {
      endPoint: userinput //
      //req.body.endPoint: var userinput = $('#category').val();
    };
    console.log(data);

    $.ajax({
      url: url + '/words/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response){
      console.log("response: ", response);
      // console.log(response.results[0]);
      $('#result').html('<div class="flashcard">' + '</div>');
      for (var w = 0; w < response.results.length; w++){
        var headword = response.results[w].headword;
        var definition = response.results[w].senses[0].definition;
        var card = headword + '<p>' + definition + '</p>';
        console.log(card);
        flashcard.push('<input type="checkbox" name="category" value="'+card+'">'+ card +'<br>');
        console.log(flashcard);
        // $('#result')
        // .append('<input type="checkbox" name="category" value="'+card+'">'+ card +'<br>')
        // console.log("definition: ", response.results[w].senses[0].definition);
      } // end of flashcard loop
      // $('#result').append(flashcard);
      // prev/next btn citation http://stackoverflow.com/questions/11594761/how-to-loop-images-in-array-with-prev-next-functionality
      var timesRun = 0;
      var prevNext = flashcard.length;
      $('#prev, #next').click(function(){
        $('#flashcard').html('<div class="flashcard">' + '</div>');
        $('#flashcard').append(flashcard[timesRun])
        id = this.id==='next' ? timesRun++ : timesRun--;
        timesRun = timesRun == -1 ? prevNext-1 : timesRun%prevNext;
      })
    }) //end ajax
  }); // end search

// save the words
  $('#save').click(function(e){
    e.preventDefault();
    var checkedwords = []; // put outside of function
    $('input:checked').each(function(e){
      checkedwords.push($(this).val());
      console.log(checkedwords);
    })
    // $('#savedwords').append(checkedwords+'<br>')
    // $(this).prop('disabled', true);

    var data = {
      newWord: checkedwords
    };

    $.ajax({
      url: url + '/words/new',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log( "response: ", response );
    }); // end AJAX
  }) //end save btn listner

//show all the words
  $('#show_all').click(function(e){
    $.ajax({
      url: url + '/words/showall',
      dataType: 'json'
    }).done(function(response){
      console.log("show all: ", response);
      for (var a = 0; a < response.length; a++){
        $('#all_saved').append(response[a].newWord);
      }
    }) // end AJAX
  }) //end show-all btn listener
}) // end

function handleSubmit(e) {
   e.preventDefault();
    let formText = document.getElementById('name').value;
    const errorMessage = document.getElementById('errorMessage');
  console.log(formText, "retexts from submit <====");
    errorMessage.innerHTML = "";

    if(Client.checkForName(formText)){
      fetch("http://localhost:8081/article", {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
              "Accept": "application/json, text/plain, */*",
              "Content-Type": "application/json",
          },
          body: JSON.stringify({formText: formText}),
      })
          .then((res) => res.json())
          .then((res) => {
              updateUI(res);
              console.log(res, "res from submit <====");
          })
    }else{
      errorMessage.innerHTML = "Your name could not be found!";
      console.log("Name could not be found.")
    }

    console.log("::: Forrgorord morningm Submitted :::")
}

async function updateUI(res) {
  console.log("res ====>", res )
    // GET function that takes info from the server
    document.querySelector('#confidence').innerText = 'Confidence of analysis = ' + res.confidence + '%';
    document.querySelector('#subjectivity').innerText = res.subjectivity;
    document.querySelector('#irony').innerText = `Ironic? ${iron(
        res.irony
      )}`;
    document.querySelector('#score').innerText = `Polarity score: ${score(
        res.score_tag
      )}`;
}

const iron = (irony) => {
  if (irony === "IRONIC") {
    return "Yup ;)"
  } else if (irony === "NONIRONIC"){
    return "No :/"
  }
}

const score = (score_tag) => {
  if (score_tag === "P+") {
    return "Very positive";
  } else if (score_tag === "P") {
    return "Positive";
  } else if (score_tag === "NEU") {
    return "Neutral";
  } else if (score_tag === "N") {
    return "Negative";
  } else if (score_tag === "N+") {
    return "Very negative";
  } else {
    return "Without sentiment";
  }
};

export { handleSubmit, iron, score };

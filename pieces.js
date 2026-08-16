// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

}


 
 // Ajout d'un écouteur d'événement sur le bouton de tri
 const boutonTrier = document.querySelector(".btn-trier");

//ecoute du bouton de tri
boutonTrier.addEventListener("click", function () {

    // Création d'une copie du tableau de pièces pour le tri
    const piecesOrdonnees = Array.from(pieces);

    // Tri des pièces par prix croissant utilisation de fonction .sort qui prend en paramètre une fonction de comparaison
    piecesOrdonnees.sort(function (a, b) {
        // Tri des pièces par prix croissant
    return a.prix - b.prix;
    });

    // Mise à jour de l'affichage des fiches après le tri
    console.log(piecesOrdonnees);
});

 // Ajout d'un écouteur d'événement sur le bouton decroissant
 const boutonDecroissant = document.querySelector(".btn-decroissant");
 
//ecoute du bouton decroissant
boutonDecroissant.addEventListener("click", function () {

    // Création d'une copie du tableau de pièces pour le tri
    const piecesOrdonnees = Array.from(pieces);

    // Tri des pièces par prix croissant utilisation de fonction .sort qui prend en paramètre une fonction de comparaison
    piecesOrdonnees.sort(function (a, b) {
        // Tri des pièces par prix décroissant
    return b.prix - a.prix;
    });

    // Mise à jour de l'affichage des fiches après le tri
    console.log(piecesOrdonnees);
});

// Ajout d'un écouteur d'événement sur le bouton de filtrage
const boutonFiltrer = document.querySelector(".btn-filtrer");

//ecoute du bouton de filtrage
boutonFiltrer.addEventListener("click", function () {

      // Filtrage des pièces dont le prix est inférieur ou égal à 35 € a laide de la fonction .filter qui prend en paramètre une fonction de test
    const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });

    // Mise à jour de l'affichage des fiches après le tri
    console.log(piecesFiltrees);
});

// Ajout d'un écouteur d'événement sur le bouton de tri par description
const boutonDescription = document.querySelector(".btn-description");

//ecoute du bouton de filtrage
boutonDescription.addEventListener("click", function () {

    // Filtrage des pièces selon description
    const piecesDecrite = pieces.filter(function (piece) {
       return piece.description;
   });

    // Mise à jour de l'affichage des fiches après le tri
    console.log(piecesDecrite);
});

// Création d'un tableau contenant uniquement les noms des pièces
const noms = pieces.map(piece => piece.nom);

// Suppression des noms des pièces dont le prix est supérieur à 35 €
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}

// Affichage du tableau des noms dans la console
console.log(noms)

//Création de la liste
const abordablesElements = document.createElement('ul');

//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}

// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
.appendChild(abordablesElements);

// filtre selon disponibilité  
const piecesDisponibles = pieces.filter(function (piece) {
    return piece.disponibilite;
});

// Création d'un tableau contenant uniquement les noms et prix des pièces
const nomPrix = piecesDisponibles.map(piece => ({nom: piece.nom, prix: piece.prix}));

//création de la liste
const nomPrixElements = document.createElement('ul');

//Ajout de chaque nom et prix à la liste
for(let i=0; i < nomPrix.length ; i++){
   const nomPrixElement = document.createElement('li');
   nomPrixElement.innerText = `${nomPrix[i].nom} - ${nomPrix[i].prix} €`;
   nomPrixElements.appendChild(nomPrixElement)
}

// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.nom_prix')
   .appendChild(nomPrixElements);

// Affichage du tableau des noms et prix dans la console
console.log(nomPrix);





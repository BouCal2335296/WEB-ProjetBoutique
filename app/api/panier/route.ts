export async function GET() {

    const reponse = await fetch("https://projet-prog4e07.cegepjonquiere.ca/api/paniers/idsArticle?id=1") //REMPLACER PAR ID UTILISATEUR
    const data = await reponse.json();
    return new Response(JSON.stringify(data));

}
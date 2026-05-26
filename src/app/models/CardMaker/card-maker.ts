export interface MarcaAuto {
    id: string;
    name: string;
}

export interface ModeloAuto {
    id: string;
    name: string;

}


//String para los id ya que los datos vienen entre comillas
/*
curl --request GET \
    --url https://car-specs.p.rapidapi.com/v2/cars/makes \
    --header 'Content-Type: application/json' \
    --header 
    'x-rapidapi-host: car-specs.p.rapidapi.com' \
    --header 
    'x-rapidapi-key: 32a47549f7msh3702c15b4b278ccp1aff38jsn957a8427ffca'
 */
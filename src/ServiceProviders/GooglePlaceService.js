import RNGooglePlaces from 'react-native-google-places';
import {
  Platform
} from 'react-native';


export default function locationModal () {
  return new Promise(function(resolve, reject) { 
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
        const postalCode =  place.addressComponents.filter((item) => item.types[0] ===  'postal_code');
        resolve({...place, postalCode: postalCode.length ? postalCode[0].name : '' })
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
    })
    .catch(error => reject(error));  // error is a Javascript Error object
  })
  
}

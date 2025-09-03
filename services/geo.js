class Geo {
    haversine(lat1, lon1, lat2, lon2) {
        let dLat = (lat2 - lat1) * Math.PI / 180.0;
        let dLon = (lon2 - lon1) * Math.PI / 180.0;
          

        lat1 = (lat1) * Math.PI / 180.0;
        lat2 = (lat2) * Math.PI / 180.0;
        
        let a = Math.pow(Math.sin(dLat / 2), 2) + 
                   Math.pow(Math.sin(dLon / 2), 2) * 
                   Math.cos(lat1) * 
                   Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c;
    }

    async getDrivingDistanceAndTime(cords) {
        let cstring = '';
        for(let i = 0; i < cords.length; i++) {
            cstring = cstring + `${cords[i][1]},${cords[i][0]}`;
            if (i < cords.length-1) cstring  = cstring + ';';
        }
        const url = `http://router.project-osrm.org/table/v1/driving/${cstring}?annotations=distance,duration&sources=0`;

        let data;
        try {
            const response = await fetch(url);
            data = await response.json();
        // console.log(data);
            if (data.code != 'Ok') return null;
        } catch (err) {
           console.log(err)
           return null;
        }
        return {
            distances: data.distances[0], // in meters
            durations: data.durations[0] // in seconds
        }
    }
};
export default new Geo();
import hospital from "../modals/hospital.js";
import geo from "../services/geo.js";
import llm from "../services/llm.js";

class SearchController {
    async search(req, res) {
        const body = req.body;
        if (!body) {
            return res.json({
                ok: false,
                error: "Incomplete request"
            })
        }

        const userCords = body?.cords;
        const symptoms = body?.symptoms;

        if (!userCords || userCords.length != 2) {
            return res.json({
                ok: false,
                error: "Incomplete request"
            })
        }

        var hospitals;
        try {
            hospitals = await hospital.find();
        } catch (err) {
            console.log(err);
            return res.json({
                ok: false,
                error: "Something went wrong"
            })
        }

        var dept = null;
        if (symptoms && symptoms.length < 400) {
            try {
                const response = await llm.findDept(symptoms);
                if (response.status != 'completed') {
                    dept = null
                }
                else {
                    dept = response.output_text;
                }
            } catch (err) {
                console.log(err);
            }

        }

        hospitals = hospitals.filter((elem) => {
            if (dept != null && !elem.departments.includes(dept)) return false;
            return geo.haversine(userCords[0], userCords[1], elem.cords[0], elem.cords[1]) < 50.0 && elem.vacancy > 0;
        })
        // console.log(hospitals)

        if (!hospitals || hospitals.length == 0) {
            return res.json({
                ok: true,
                error: null,
                count: 0,
                list: []
            })
        }

        var distances;
        var durations;
        var query = [[userCords[0], userCords[1]]];
        for(let i = 0; i < hospitals.length; i++) {
            query.push([hospitals[i].cords[0], hospitals[i].cords[1]]);
        }
        var tempp;
        try {
            tempp = await geo.getDrivingDistanceAndTime(query);
        } catch (err) {
            console.log(err);
            return res.json({
                ok: false,
                error: "Navigation error"
            })
        }
        distances = tempp.distances;
        durations = tempp.durations;

        var newHospitals = [];
        for(let i = 1; i < distances.length; i++) {
            newHospitals.push({
                ...hospitals[i-1]._doc,
                distance: distances[i],
                duration: durations[i]
            })
        }

        if (newHospitals.length == 1) {
            return res.json({
                ok: true,
                error: null,
                count: 1,
                list: newHospitals
            })
        }

        var normalizedDistance = [];
        var disMin = 1000000000.0;
        var disMax = 0.0;
        var normalizedDuration = [];
        var durMin = 1000000000.0;
        var durMax = 0.0;
        var normalizedVacancy = [];
        var vacMin = 1000000000.0;
        var vacMax = 0;

        for(let i = 1; i < distances.length; i++) {
            disMin = Math.min(disMin, distances[i]);
            disMax = Math.max(disMax, distances[i]);

            durMin = Math.min(durMin, durations[i]);
            durMax = Math.max(durMax, durations[i]);

            vacMin = Math.min(vacMin, newHospitals[i-1].vacancy);
            vacMax = Math.max(vacMax, newHospitals[i-1].vacancy);
        }


        var m = new Map();
        for(let i = 1; i < distances.length; i++) {
            normalizedDistance.push((distances[i] - disMin) / (disMax - disMin));
            normalizedDuration.push((durations[i] - durMin) / (durMax - durMin));
            m[newHospitals[i-1].name] = [(distances[i] - disMin) / (disMax - disMin), (durations[i] - durMin) / (durMax - durMin), (newHospitals[i-1].vacancy - vacMin) / (vacMax - vacMin)];
        }


        newHospitals.sort((a, b) => {
            return 0.3 * m[a.name][0] + 0.5 *  m[a.name][1] + 0.2 * (1-m[a.name][2]) - (0.3 * m[b.name][0] + 0.5 * m[b.name][1] + 0.2 * (1-m[b.name][2]));
        })

        return res.json({
            ok: true,
            error: null,
            count: newHospitals.length,
            list: newHospitals,
            department: dept
        })
    }
};

export default new SearchController();
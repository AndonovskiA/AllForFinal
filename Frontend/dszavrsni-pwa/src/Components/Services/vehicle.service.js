import http from "../../http-common";


class vehicleDataService{

    async get(){
        return await http.get('/Vehicle');
    }

    async getByID(ID) {
        return await http.get('/Vehicle/' + ID);
      }

    async delete(ID){
        const answer = await http.delete('/Vehicle/' + ID)
        .then(response => {
            return {ok: true, message: 'Succesfully deleted'};
        })
        .catch(e=>{
            return {ok: false, message: e.response.data};
        });

        return answer;
    }

    async post(vehicle){
       
        const answer = await http.post('/Vehicle',vehicle)
           .then(response => {
             return {ok:true, message: 'Vehicle added'}; 
           })
           .catch(error => {
            
             return {ok:false, message: error.response.data}; 
           });
     
           return answer;
    }

    async put(ID,vehicle){
        
        const answer = await http.put('/Vehicle/' + ID,vehicle)
           .then(response => {
             return {ok:true, message: 'Vehicle changed'}; 
           })
           .catch(error => {
            
             return {ok:false, message: error.response.data}; 
           });
     
           return answer;
         }

}

export default new vehicleDataService();
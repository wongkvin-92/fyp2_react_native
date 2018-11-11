//import {UserAPI} from '../API';

class StudentScheduleSystem{
    constructor(sharedObj){
	this.sharedObj = sharedObj;
    }
    
    configure(){	
    }

    _getDays(s, e){
    var a = [];
    while(s < e) {
      let x = s;
      let fixZero = e => Math.floor(e/10) ==0? "0"+ e:e +"";
      let m = x.getMonth()+1;
      let month = fixZero(m);
      let year = x.getFullYear();
	let date = fixZero(x.getDate());
      let formatDate = [year, month, date].join("-");
        a.push(formatDate);
        s = new Date(s.setDate(
            s.getDate() + 1
        ));
    }
    return a;
    }
    

    createEmptyDates(start, end){
	let d1 = start.split("-").map(e=>parseInt(e));
        let d2 = end.split("-").map(e=>parseInt(e));
	let emptySchedules = {};

	let startDate = new Date(d1[0], d1[1]-1, d1[2]);
        let endDate = new Date(d2[0], d2[1]-1, d2[2]+1);
	
        let dateArr = this._getDays(new Date(startDate), new Date(endDate));
	dateArr.forEach( el => emptySchedules[el]=[]);
	return emptySchedules;
    }


    
    
    generateSchedule(permanantClasses, replacementClasses, semStartDate, semEndDate){
	let d = this.createEmptyDates(semStartDate, semEndDate);
	return d;
    }
};

export {
    StudentScheduleSystem
};

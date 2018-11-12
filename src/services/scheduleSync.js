//import {UserAPI} from '../API';

export class StudentScheduleSystem{
    constructor(sharedObj={}){
	this.sharedObj = sharedObj;
    }    
    
    configure(){	
    }


    _getDays(s, e) {
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
    };



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


        //new function call it in componentdidmount
    //updateSubjectSem = (success) =>
    generateSchedule(allSchedule, period, success=null){
	
	let convertToDate = (strDate) => {
            let d = strDate.split("-").map(x => parseInt(x));
            return new Date(d[0], d[1]-1, d[2]);
	};
	let getWeekDay = (strDate) => {
            let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return weekDay[convertToDate(strDate).getDay()];
	};

	let startDate = convertToDate(period.start_date);
	let endDate  = period.end_date;

	let dateArr = this._getDays(new Date(startDate), new Date(endDate));

	let emptySchedules ={};
	let newSchedule = {};
	dateArr.forEach( el => emptySchedules[el]=[]);

	let permenantSchedule = {};
	let replacementClasses = {};
	let cancelledClasses = {};


	//console.log(dateArr.map(getWeekDay));
	dateArr.forEach(el => {
            permenantSchedule[el] = allSchedule.filter(d =>
						       d.oldDateTime == null && d.day == getWeekDay(el)
						      );
            replacementClasses[el] = allSchedule.filter(d =>
							d.newDateTime != null && d.newDateTime == el  && d.status=="approved"
						       );

            cancelledClasses[el] = allSchedule.filter(d =>
						      d.oldDateTime != null && d.oldDateTime == el
						     ).map(e => parseInt(e.classID));
	}
		       );
	//let finalSchedule = {...permenantSchedule, ...replacementClasses};
	let finalSchedule = {};
	Object.keys(permenantSchedule).forEach( k => {
	    let combinedSchedule = permenantSchedule[k].concat(replacementClasses[k]);

	    //finalSchedule[k]['isCancelled'] = true; //TODO
	    finalSchedule[k] = Object.values(combinedSchedule).map( j => {
		const jCopy = {...j};
		let classID = j['classID']
		var isCancelled = cancelledClasses[k].includes(parseInt(classID));
		//jCopy['isCancelled'] = cancelledClasses[k].includes(parseInt(classID));
		jCopy['isCancelled'] = isCancelled;
		jCopy['curDate'] = k;
		//let a = j;
		//j['wKvin'] = 'here';
    		//finalSchedule[k][j]['isCancelled'] = cancelledClasses[k].indexOf(parseInt(finalSchedule[k][j]['classID'])) >= 0; // finalSchedule[k][j] in cancelledClasses;
    		//finalSchedule[k][j]['curDate'] = k;
		//console.log(	finalSchedule[k][j]['isCancelled']);
		return jCopy;
	    });
	});
	
	if(success != null)
	    success(finalSchedule);
	//this.props.setSchedule(finalSchedule);
	console.log("Final Schedule", finalSchedule);
    };

};

//export {
//    StudentScheduleSystem
//};

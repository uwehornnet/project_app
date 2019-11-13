import React, {useEffect} from "react";
import shore from './images/shore.jpg';
import clouds from './images/clouds.jpg';
import coast from './images/coast.jpg';
import palm from './images/palm.jpg';
import bridge from './images/bridge.jpg';
import colorfull from './images/colorfull.jpg';
import hills from './images/hills.jpg';
import forrest from './images/forrest.jpg';
import ny from './images/ny.jpg';
import stars from './images/stars.jpg';

export const uid = () => {
	return '_' + Math.random().toString(36).substr(2, 9);
};

export const bgImages = [
	shore,
	clouds,
	coast,
	palm,
	bridge,
	colorfull,
	hills,
	forrest,
	ny,
	stars
];

export const colors = [
	'#fc5c65',
	'#fd9644',
	'#fed330',
	'#26de81',
	'#2bcbba',
	'#45aaf2',
	'#a55eea'
];

export const randomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
};


export const groupBy = function(xs, key) {
	return xs.reduce(function(rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

export const useOutsideAlerter = (ref, condition, callback) => {
	const handleClickOutside = (event) => {
		if (condition && ref.current && !ref.current.contains(event.target)) callback();
	};
	
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});
};


export const debounce = (delay, fn) => {
	let timerId;
	return function (...args) {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			fn(...args);
			timerId = null;
		}, delay);
	}
};

export const convertHMS = (value) => {
	const sec = parseInt(value, 10); // convert value to number if it's string
	let hours   = Math.floor(sec / 3600); // get hours
	let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
	let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
	// add 0 if value < 10
	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
}

export const createProjectFromTemplate = (project, template) => {

	// create project copy from template
	const projectCopy = {
		...project,
		createdAt: new Date()
	};

	// create boards from template
	const boards = [
		...template.boards.map(board => {
			if(board.name !== 'progress'){
				return {
					...board,
					project: projectCopy.id,
					id: uid()
				}
			}else{
				const inbox = [];
				board.columns.forEach(column => {
					column.items.forEach(id => {
						inbox.push(id)
					})
				});

				return {
					...board,
					id: uid(),
					project: projectCopy.id,
					columns: [
						...board.columns.map(column => {
							if (column.name === 'inbox') {
								return {
									...column,
									id: uid(),
									items: inbox
								};
							} else {
								return {
									...column,
									id: uid(),
									items: []
								};
							}
						})
					]
				}
			}
		})
	]

	// create checklists from template and reset them
	const checklists = [];

	// create tasks from template and reset them
	const tasksCopy = [
		...template.tasks.map(task => {

			const newTask = {
				...task,
				id: uid(),
				project: projectCopy.id,
				duedate: null,
				scheduled: null,
				recorded: 0,
				recording: false,
				createdAt: new Date()
			};

			task.checklists.forEach(list => {
				checklists.push({
					...list,
					id: uid(),
					done: false,
					parent: newTask.id,
					createdAt: new Date()
				})
			});
			return newTask;
		})
	];

	return {
		project: projectCopy,
		boards: boards,
		tasks: tasksCopy,
		checklists: checklists
	}

};

export const truncate = function(str, length, ending) {
	if (length == null) {
		length = 100;
	}
	if (ending == null) {
		ending = '...';
	}
	if (str.length > length) {
		return str.substring(0, length - ending.length) + ending;
	} else {
		return str;
	}
};


export const calculatedCosts = (expenses) => {
	const salary = (
		parseFloat(expenses.personalSalary) +
		parseFloat(expenses.investmentSavings) +
		parseFloat(expenses.savings)
	);

	const costs = (
		parseFloat(expenses.officeRent) +
		parseFloat(expenses.internetCosts) +
		parseFloat(expenses.mobileCosts) +
		parseFloat(expenses.accountantCosts) +
		parseFloat(expenses.legalFees) +
		parseFloat(expenses.marketingCosts) +
		parseFloat(expenses.businessInsuranceCosts) +
		parseFloat(expenses.webHostingCosts) +
		parseFloat(expenses.accountingCosts) +
		parseFloat(expenses.managementCosts) +
		parseFloat(expenses.membershipCosts) +
		parseFloat(expenses.productivityCosts) +
		parseFloat(expenses.softwareCosts) +
		parseFloat(expenses.hardwareCosts) +
		parseFloat(expenses.officeSupplyCosts) +
		parseFloat(expenses.healthInsuranceCosts)
	);

	const totalCosts = Math.round(costs + (costs * (parseInt(expenses.taxRate) / 100)));


	const hours = (
		(parseInt(expenses.weeksOfVacation) * 5 * 24) +
		(parseInt(expenses.sickDays) * 24) +
		(parseInt(expenses.miscDaysOff) * 24)
	);

	const vacation = (parseInt(expenses.weeksOfVacation) * 5 * 24);
	const sick = (parseInt(expenses.sickDays) * 24);
	const miscOff = (parseInt(expenses.miscDaysOff) * 24);
	const absHours = expenses.availableWorkingHours - (vacation + sick + miscOff);

	const totalHours = Math.round(absHours - (absHours * (parseInt(expenses.nonBillableWork) / 100)));

	const AnnualBusinessCosts = (salary + totalCosts);
	const AnnualWorkingHours = (totalHours);

	return {
		AnnualBusinessCosts: AnnualBusinessCosts,
		AnnualWorkingHours: AnnualWorkingHours
	}
}
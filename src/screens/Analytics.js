import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import moment from "moment";
import {
    backgroundColor,
    dark,
    primary,
    white,
    color,
    boxBackgroundColor,
    inputBorderColor,
    inputBackgroundColor, modalBackgroundColor
} from "../misc/Theme";
import {connect} from "react-redux";
import {motion} from "framer-motion";
import {calculatedCosts, convertHMS, groupBy} from "../helpers";
import Menu from "../components/Menu";
import {DatePicker} from "../components/DatePicker";
import {ProgressBar} from "../components/ProgressBar";

const Container = styled.div`
    padding: 24px 16px 16px 86px;
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    background: ${backgroundColor};
`;

const ControlBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0px;
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
`;

const Columns = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: stretch;
    margin-top: 16px;
`;

const Column = styled.div`
    flex: 1;
    align-self: stretch;
    position: relative;
    
    &::before{
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 24px;
        background: linear-gradient(360deg, rgba(${boxBackgroundColor}, 0), rgba(${boxBackgroundColor}, 1));
        z-index: 999;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    
    &::after{
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 24px;
        background: linear-gradient(180deg, rgba(${boxBackgroundColor}, 0), rgba(${boxBackgroundColor}, .9));
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    
`;

const Box = styled.div`
    background: ${boxBackgroundColor};
    border-radius: 4px;
    width: 100%;
    height: 100%;
    padding: 8px;
    max-height: 50vh;
    overflow-y: scroll;
    position: relative;
    
    &::-webkit-scrollbar{
        display: none;
    }
    
    
    
    svg{
        width: 50%;
        height: auto;
        display: block;
        margin: 0px auto;
        
        &.fill{
            fill: rgba(${color}, .1);
        }
    }
    
    div{
        color: rgba(${color}, .7);
        
        small{
            display: block;
        }
        
        strong{
            font-weight: normal;
            font-size: 2rem;
        }
    }
    
    .task{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        border: 1px solid ${inputBackgroundColor};
        background: ${inputBackgroundColor};
        border-left: 7px solid transparent;
        border-radius: 4px;
        margin-top: 8px;
        
        span{
            display: flex;
            align-items: center;
            
            svg{
                height: 12px;
                width: auto;
                display: block;
                margin-right: 8px;
                fill: rgba(${color}, .7)
            }
        }
    }
`;

const Table = styled.div`
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #141518;
    border-radius: 4px;
    color: white;
    height: 40vh;
    overflow-x: scroll;
    
    &::-webkit-scrollbar{
        display: none;
    }
    
   
`;

const TableWrapper = styled.div`
    position: relative;
    
     .label{
        position: absolute;
        top: 0px;
        left: 0px;
        padding: 16px;
        z-index: 999;
        color: white;
        
        small{
            display: block;
        }
        
        strong{
            font-size: 2.4rem;
            font-weight: normal;
        }
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    border-right: 1px solid rgba(${white}, .2);
    padding: 4px;
    position: relative;
    min-width: 140px;
    
    &:last-of-type{
        border-right: none;
    }
`;

const Label = styled.div`
    color: rgba(${white}, .7);
    font-size: .9rem;
    display: block;
    text-align: center;
    width: 100%;
    padding: 4px;
`;

const Bar = styled(motion.div)`
    width: 100%;
    display: block;
    border-radius: 4px;
    background: rgba(${primary}, 1);
    height: 0px;
    margin-bottom: 4px;
    
    .inner{
        display: none;
        position: relative;
        
        .innerLabel{
            position: absolute;
            min-width: 160px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -100%);
            background: rgba(${dark}, 1);
            color: rgba(${white}, .7);
            padding: 8px;
            display: none;
            z-index: 999;
            border-radius: 4px;
            box-shadow: 0px 2px 9px -4px rgba(${dark}, 1);
            
            small{
                display: block;
                margin-bottom: 4px;
                color: rgba(${white}, .4)
            }
        }
        
        &:hover{
            .innerLabel{
                display: block;
            }
        }
        
        &:first-of-type{
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }
        
        &:last-of-type{
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }
    
    &:hover{
        .inner{
            display: block;
        }
    }
`;

const Analytics = ({settings, tasks, times}) => {

    const {expenses} = settings;
    const current = moment().format('YYYY-MM-DD');
    const [filter, setFilter] = useState('today');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [billableHours, setBillableHours] = useState(0);
    const [goal, setGoal] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        const array = [];
        const start = moment(current).startOf(filter);
        const end = moment(current).endOf(filter);

        while(start <= end){
            array.push(start.format('YYYY-MM-DD'));
            start.add(1, 'days');
        }
        setDates(array);

        if(filter === 'today'){
            setGoal(Math.round(calculatedCosts(settings.expenses).AnnualBusinessCosts / Math.abs(moment().startOf('year').diff(moment().endOf('year'), 'day'))));
            setRemainingTime(parseInt(moment().format('HH')));
            setTotalTime(24);
        }

        if(filter === 'isoWeek'){
            setGoal(Math.round(calculatedCosts(settings.expenses).AnnualBusinessCosts / Math.abs(moment().startOf('year').diff(moment().endOf('year'), 'week'))));
            setRemainingTime(parseInt(moment().isoWeekday()));
            setTotalTime(7);
        }

        if(filter === 'month'){
            setGoal(Math.round(calculatedCosts(settings.expenses).AnnualBusinessCosts / Math.abs(moment().startOf('year').diff(moment().endOf('year'), 'month'))));

            setTotalTime(Math.abs(
                moment().startOf('month').diff(moment().endOf('month'), 'days')
            ));
            setRemainingTime(parseInt(moment().format('DD')));

        }

    }, [current, filter]);

    useEffect(() => {
        const start = moment(current).startOf(filter);
        const end = moment(current).endOf(filter);

        setStartDate(start);
        setEndDate(end);

        let totalRecordedTime = 0;
        times.filter(time => {
            const recordedDate = moment(time.createdAt);

            if(recordedDate.isBetween(start, end, null, []) || (recordedDate.format('YYYY-MM-DD') === start.format('YYYY-MM-DD'))){
                return time;
            }
        }).forEach(time => {
            totalRecordedTime += time.time
        });

        setBillableHours(totalRecordedTime);
    }, [dates, filter]);

    return (
        <Container>
            <ControlBar>
                <Controls/>
                <Menu
                    position={'bottom-left'}
                    label={
                        <>
                            <svg viewBox="0 0 408 408"><path d="m51 153c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zm306 0c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zm-153 0c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51z"/></svg>
                        </>
                    }
                    items={[
                        {
                            label: (
                                <>
                                    <svg viewBox="0 0 361.77 361.77"><path d="m323.885 43.77h-27.5v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-129v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-27.5c-13.807 0-25 11.193-25 25v268c0 13.809 11.193 25 25 25h286c13.807 0 25-11.191 25-25v-268c0-13.807-11.194-25-25-25zm-17 278.5h-252v-203h252z"/><path d="m89.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m89.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/></svg>
                                    today
                                </>
                            ),
                            onClick: () => setFilter('today')
                        },
                        {
                            label: (
                                <>
                                    <svg viewBox="0 0 361.77 361.77"><path d="m323.885 43.77h-27.5v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-129v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-27.5c-13.807 0-25 11.193-25 25v268c0 13.809 11.193 25 25 25h286c13.807 0 25-11.191 25-25v-268c0-13.807-11.194-25-25-25zm-17 278.5h-252v-203h252z"/><path d="m89.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m89.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/></svg>
                                    current week
                                </>
                            ),
                            onClick: () => setFilter('isoWeek')
                        },
                        {
                            label: (
                                <>
                                    <svg viewBox="0 0 361.77 361.77"><path d="m323.885 43.77h-27.5v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-129v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-27.5c-13.807 0-25 11.193-25 25v268c0 13.809 11.193 25 25 25h286c13.807 0 25-11.191 25-25v-268c0-13.807-11.194-25-25-25zm-17 278.5h-252v-203h252z"/><path d="m89.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m89.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/></svg>
                                    current month
                                </>
                            ),
                            onClick: () => setFilter('month')
                        }
                    ]}
                />
            </ControlBar>
            <TableWrapper>
                <div className={'label'}>
                    <small>billable hours</small>
                    <strong>{convertHMS(billableHours)}</strong>
                </div>
                <Table>

                    {dates.map(date => {
                        let totalTime = 0;
                        const filteredTimes = times.filter(time => moment(time.createdAt).format('YYYY-MM-DD') === date);

                        filteredTimes.forEach(time => {
                            totalTime += time.time
                        });

                        const groupedTimes = groupBy(filteredTimes, 'task');
                        const group = Object.keys(groupedTimes).map(id => {
                            let trackedTime = 0;
                            groupedTimes[id].forEach(item => {
                                trackedTime += item.time
                            });

                            return {
                                task: tasks.find(task => task.id === id),
                                height: `${(100 / totalTime) * trackedTime}%`,
                                time: trackedTime
                            }
                        });

                        return(
                            <Row key={date}>
                                {totalTime > 0 ? (
                                    <Bar
                                        animate={{
                                            height: `${( totalTime / 3600 ) * 5}%`
                                        }}
                                    >
                                        {group.sort((a, b) => {
                                            if (a.time < b.time) return -1;
                                            if (a.time > b.time) return 1;
                                            return 0
                                        }).filter(item => item.task).map(item => (
                                            <div
                                                key={item.task.id}
                                                className={'inner'}
                                                style={{
                                                    background: item.task.color,
                                                    height: item.height
                                                }}
                                            >
                                                <div
                                                    className={'innerLabel'}
                                                >
                                                    <small>{item.task.name}</small>
                                                    <strong>{convertHMS(item.time)}</strong>
                                                </div>
                                            </div>
                                        ))}
                                    </Bar>
                                ) : null}

                                <Label>
                                    {moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('DD.MMMM YYYY')}
                                </Label>
                            </Row>
                        )
                    })}
                </Table>
            </TableWrapper>
            <Columns>
                <Column style={{maxWidth: 300, marginRight: 16}}>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <svg viewBox="0 0 512 512" style={{marginBottom: 24}}><circle cx="256" cy="112" fill="#f6bb00" r="88"/><g fill="#02c26a"><path d="m256 288h-18.74517a32 32 0 0 1 -22.62741-9.37258l-5.25484-5.25484a32 32 0 0 1 -9.37258-22.62741v-18.74517h18.74517a32 32 0 0 1 22.62741 9.37258l5.25484 5.25484a32 32 0 0 1 9.37258 22.62741z"/><path d="m168 240h-18.74517a32 32 0 0 1 -22.62741-9.37258l-5.25484-5.25484a32 32 0 0 1 -9.37258-22.62741v-18.74517h18.74517a32 32 0 0 1 22.62741 9.37258l5.25484 5.25484a32 32 0 0 1 9.37258 22.62741z"/><path d="m344 240h18.74517a32 32 0 0 0 22.62741-9.37258l5.25484-5.25484a32 32 0 0 0 9.37258-22.62741v-18.74517h-18.74517a32 32 0 0 0 -22.62741 9.37258l-5.25484 5.25484a32 32 0 0 0 -9.37258 22.62741z"/><path d="m256 288v-18.74517a32 32 0 0 1 9.37258-22.62741l5.25484-5.25484a32 32 0 0 1 22.62741-9.37258h18.74517v18.74517a32 32 0 0 1 -9.37258 22.62741l-5.25484 5.25484a32 32 0 0 1 -22.62741 9.37258z"/></g><path d="m128 320h256v48h-256z" fill="#7dafff"/><path d="m344 488h-176l-24-120h224z" fill="#548aff"/><path d="m176 221.25488a39.73644 39.73644 0 0 0 -11.71582-28.28418l-5.25488-5.25488a39.73644 39.73644 0 0 0 -28.28418-11.71582h-18.74512a7.99977 7.99977 0 0 0 -8 8v18.74512a39.73644 39.73644 0 0 0 11.71582 28.28418l5.25488 5.25488a39.73644 39.73644 0 0 0 28.28418 11.71582h10.74512v64h-32a7.99977 7.99977 0 0 0 -8 8v48a7.99977 7.99977 0 0 0 8 8h9.44153l22.71374 113.56885a8.00041 8.00041 0 0 0 7.84473 6.43115h176a8.00041 8.00041 0 0 0 7.84473-6.43115l22.71374-113.56885h9.44153a7.99977 7.99977 0 0 0 8-8v-48a7.99977 7.99977 0 0 0 -8-8h-32v-64h10.74512a39.73644 39.73644 0 0 0 28.28418-11.71582l5.25488-5.25488a39.73644 39.73644 0 0 0 11.71582-28.28418v-18.74512a7.99977 7.99977 0 0 0 -8-8h-18.74512a39.73644 39.73644 0 0 0 -28.28418 11.71582l-5.25488 5.25488a39.73644 39.73644 0 0 0 -11.71582 28.28418v90.74512h-72v-16h10.74512a39.73644 39.73644 0 0 0 28.28418-11.71582l5.25488-5.25488a39.73644 39.73644 0 0 0 11.71582-28.28418v-18.74512a7.99977 7.99977 0 0 0 -8-8h-18.74512a39.73644 39.73644 0 0 0 -28.28418 11.71582l-.9707.9707v-29.0227a96 96 0 1 0 -16 0v29.0227l-.9707-.9707a39.73644 39.73644 0 0 0 -28.28418-11.71582h-18.74512a7.99977 7.99977 0 0 0 -8 8v18.74512a39.73644 39.73644 0 0 0 11.71582 28.28418l5.25488 5.25488a39.73644 39.73644 0 0 0 28.28418 11.71582h10.74512v16h-72zm176 0a23.84457 23.84457 0 0 1 7.0293-16.9707l5.25488-5.25488a23.84457 23.84457 0 0 1 16.9707-7.0293h10.74512v10.74512a23.84457 23.84457 0 0 1 -7.0293 16.9707l-5.25488 5.25488a23.84457 23.84457 0 0 1 -16.9707 7.0293h-10.74512zm-80.9707 31.0293 5.25488-5.25488a23.84457 23.84457 0 0 1 16.9707-7.0293h10.74512v10.74512a23.84457 23.84457 0 0 1 -7.0293 16.9707l-5.25488 5.25488a23.84457 23.84457 0 0 1 -16.9707 7.0293h-10.74512v-10.74512a23.84457 23.84457 0 0 1 7.0293-16.9707zm-95.0293-140.28418a80 80 0 1 1 80 80 80.09041 80.09041 0 0 1 -80-80zm44.28418 160.9707-5.25488-5.25488a23.84457 23.84457 0 0 1 -7.0293-16.9707v-10.74512h10.74512a23.84457 23.84457 0 0 1 16.9707 7.0293l5.25488 5.25488a23.84457 23.84457 0 0 1 7.0293 16.9707v10.74512h-10.74512a23.84457 23.84457 0 0 1 -16.9707-7.0293zm117.15723 207.0293h-162.88282l-20.80029-104h204.4834zm38.55859-120h-240v-32h240zm-226.74512-128a23.84457 23.84457 0 0 1 -16.9707-7.0293l-5.25488-5.25488a23.84457 23.84457 0 0 1 -7.0293-16.9707v-10.74512h10.74512a23.84457 23.84457 0 0 1 16.9707 7.0293l5.25488 5.25488a23.84457 23.84457 0 0 1 7.0293 16.9707v10.74512z"/><path d="m264 176v-16h4a28 28 0 0 0 0-56h-4v-24h24v-16h-24v-16h-16v16h-4a28 28 0 0 0 0 56h4v24h-24v16h24v16zm-20-72a12 12 0 0 1 0-24h4v24zm20 16h4a12 12 0 0 1 0 24h-4z"/></svg>
                        <div>
                            <small>earned money</small>
                            <strong>
                                {billableHours ? ((billableHours / 3600) * expenses.profit10).toFixed(2) : (0).toFixed(2)}
                            </strong>
                        </div>

                        <ProgressBar
                            style={{
                                marginTop: 24,
                                minWidth: 200
                            }}
                            label={`current target: ${goal.toFixed(2)}`}
                            total={goal}
                            done={((billableHours / 3600) * expenses.profit10)}
                        />

                        <ProgressBar
                            style={{
                                marginTop: 8,
                                minWidth: 200
                            }}
                            label={'remaining time'}
                            total={totalTime}
                            done={remainingTime}
                        />

                        <ProgressBar
                            style={{
                                marginTop: 8,
                                minWidth: 200
                            }}
                            label={`longtime goal: ${calculatedCosts(settings.expenses).AnnualBusinessCosts.toFixed(2)}`}
                            total={calculatedCosts(settings.expenses).AnnualBusinessCosts.toFixed(2)}
                            done={((billableHours / 3600) * expenses.profit10)}
                        />
                    </Box>
                </Column>

                <Column>
                    <Box>
                        {billableHours ? times.filter(item =>  dates.includes(moment(item.date).format('YYYY-MM-DD'))).map(item => {
                            const task = tasks.find(task => task.id === item.task);
                            if(task) {
                                return (
                                    <div
                                        key={item.createdAt}
                                        className={'task'}
                                        style={{
                                            borderLeftColor: task.color
                                        }}
                                    >
                                        <span>{task.name}</span>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                                <span
                                                    style={{marginRight: 24}}
                                                >
                                                    <svg viewBox="0 0 361.77 361.77"><path d="m323.885 43.77h-27.5v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-129v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-27.5c-13.807 0-25 11.193-25 25v268c0 13.809 11.193 25 25 25h286c13.807 0 25-11.191 25-25v-268c0-13.807-11.194-25-25-25zm-17 278.5h-252v-203h252z"/><path d="m89.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m89.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/></svg>
                                                    {moment(item.createdAt).format('DD.MMMM YYYY, hh:mm:ss')}
                                                </span>
                                            <span>
                                                    <svg viewBox="0 0 97.16 97.16"><path d="m48.58 0c-26.787 0-48.58 21.793-48.58 48.58s21.793 48.58 48.58 48.58 48.58-21.793 48.58-48.58-21.793-48.58-48.58-48.58zm0 86.823c-21.087 0-38.244-17.155-38.244-38.243s17.157-38.243 38.244-38.243 38.244 17.155 38.244 38.243-17.157 38.243-38.244 38.243z"/><path d="m73.898 47.08h-21.832v-26.25c0-2.209-1.791-4-4-4s-4 1.791-4 4v30.25c0 2.209 1.791 4 4 4h25.832c2.209 0 4-1.791 4-4s-1.791-4-4-4z"/></svg>
                                                {convertHMS(item.time)}h
                                                </span>
                                        </div>

                                    </div>
                                );
                            }
                        }) : (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <svg
                                        className={'fill'}
                                        viewBox="0 0 438.533 438.533"
                                        style={{
                                            height: 70,
                                            width: 'auto',
                                        }}
                                    >
                                        <path d="m431.398 210.987-67.954-157.599c-1.903-4.762-5.373-8.757-10.421-11.991-5.041-3.239-10.037-4.854-14.985-4.854h-237.539c-4.949 0-9.945 1.615-14.987 4.854-5.042 3.234-8.52 7.229-10.422 11.991l-67.953 157.599c-4.759 11.611-7.137 23.315-7.137 35.115v137.618c0 4.949 1.807 9.23 5.424 12.848 3.619 3.613 7.902 5.424 12.851 5.424h401.991c4.948 0 9.229-1.811 12.847-5.424 3.614-3.617 5.421-7.898 5.421-12.848v-137.618c-.001-11.8-2.373-23.504-7.136-35.115zm-139.327 26.552-27.113 54.819h-91.367l-27.123-54.819h-90.221c.193-.38.428-1.14.715-2.282.287-1.14.525-1.903.715-2.283l60.526-141.607h202.138l60.521 141.607c.194.575.431 1.335.711 2.283.288.947.524 1.707.719 2.282z"/>
                                    </svg>
                                    <span
                                        style={{
                                            textAlign: 'center'
                                        }}
                                    >
                                        start tracking ...
                                    </span>
                                </div>

                            </div>
                        )}
                    </Box>
                </Column>
            </Columns>
        </Container>
    )
};

const mapStateToProps = state => ({
    settings: state.settings,
    times: state.timer,
    tasks: state.tasks
});

export default connect(mapStateToProps)(Analytics);
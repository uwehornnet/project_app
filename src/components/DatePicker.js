import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import {Input} from "../misc/Form";
import {useOutsideAlerter} from "../helpers";
import {backgroundColor, inputBackgroundColor, primary, color} from "../misc/Theme";
import * as moment from 'moment';


const Container = styled.div`
    position: relative;
`;

const Picker = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: auto;
    box-shadow: 0px 1px 6px -3px rgba(0,0,0, .3);
    z-index: 999;
    background: ${backgroundColor};
    padding: 8px;
    border-radius: 4px;
`;

const PickerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0px;
    border-bottom: 1px solid ${inputBackgroundColor};
    
    div{
        flex: 1;
        font-size: 1rem;
        color: rgba(${color}, .7);
        text-align: center;
    }
    
    span{
        display: block;
        padding: 4px;
        border-radius: 4px;
        
        svg{
            display: block;
            height: 16px;
            width: auto;
            fill: rgba(${color}, .7);
            margin: 0px;
        }
        
        &:hover{
            background: rgba(${primary}, .2);
            svg{
                fill: rgba(${primary}, 1);
            }
        }
    }
`;

const Calendar = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 30px);
    grid-row-gap: 4px;
    grid-column-gap: 4px;
    
    div{
        border-radius: 4px;
        height: 30px;
        width: 100%;
        background: ${backgroundColor};
        padding: 4px;
        color: rgba(${color}, .6);
        
        &.current{
            background: rgba(${primary}, .2);
            color: rgba(${primary}, 1)
        }
        
        &:hover{
            background: rgba(${primary}, .2);
            color: rgba(${primary}, 1)
        }
    }
`;

export const DatePicker = ({onChange, value, placeholder, style, visibel}) => {

    const [current, setCurrent] = useState(moment().month());
    const [dates, setDates] = useState([]);
    const [open, setOpen] = useState(visibel ? visibel : false);

    const elem = useRef();
    useOutsideAlerter(elem, open, () => {
        setOpen(!open);
    });

    useEffect(() => {
        const start = moment().month(current).startOf('month').startOf('week');
        const end = moment().month(current).endOf('month').endOf('week');
        const d = [];

        while(start <= end){
            d.push(start.format('YYYY-MM-DD'));
            start.add(1, 'days')
        }

        setDates(d);
    }, [current]);

    return(
        <Container>
            {!visibel ? (
                <Input style={{...style}} onFocus={() => setOpen(!open)} placeholder={placeholder} defaultValue={ value !== '' ? moment(value).format('DD.MM.YYYY') : ''}/>
            ) : null}
            {open ? (
                <Picker ref={elem}>
                    <PickerHeader>
                        <span onClick={() => setCurrent(current - 1)}>
                            <svg viewBox="0 0 400.004 400.004"><path d="m382.688 182.686h-323.572l77.209-77.214c6.764-6.76 6.764-17.726 0-24.485-6.764-6.764-17.73-6.764-24.484 0l-106.768 106.77c-6.764 6.76-6.764 17.727 0 24.485l106.768 106.775c3.381 3.383 7.812 5.072 12.242 5.072s8.861-1.689 12.242-5.072c6.764-6.76 6.764-17.726 0-24.484l-77.209-77.218h323.572c9.562 0 17.316-7.753 17.316-17.315s-7.753-17.314-17.316-17.314z"/></svg>
                        </span>
                        <div>{moment().month(current).format('MMMM YYYY')}</div>
                        <span onClick={() => setCurrent(current + 1)}>
                            <svg viewBox="0 0 268.832 268.832"><path d="m265.171 125.577-80-80c-4.881-4.881-12.797-4.881-17.678 0-4.882 4.882-4.882 12.796 0 17.678l58.661 58.661h-213.654c-6.903 0-12.5 5.597-12.5 12.5 0 6.902 5.597 12.5 12.5 12.5h213.654l-58.659 58.661c-4.882 4.882-4.882 12.796 0 17.678 2.44 2.439 5.64 3.661 8.839 3.661s6.398-1.222 8.839-3.661l79.998-80c4.882-4.882 4.882-12.796 0-17.678z"/></svg>
                        </span>
                    </PickerHeader>

                    <Calendar>
                        {dates && dates.map(date => {
                            const day = moment(date);

                            return(
                                <div
                                    key={date}
                                    className={
                                        day.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') || day.format('YYYY-MM-DD') === value ? 'current' : null

                                    }
                                    onClick={() => {
                                        onChange(moment(date).format('YYYY-MM-DD'));
                                        setOpen(!open);
                                    }}
                                >
                                    {day.format('DD')}
                                </div>
                            )
                        })}
                    </Calendar>
                </Picker>
            ) : null}
        </Container>
    )
};
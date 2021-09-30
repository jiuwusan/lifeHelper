import styles from './style.less';
import { useState, useEffect } from "react";

const formatData = (str) => {
    var newstr = new Date(str);
    var y = newstr.getFullYear();
    var m = newstr.getMonth() + 1;
    var d = newstr.getDate();
    var h = newstr.getHours();
    var min = newstr.getMinutes();
    var s = newstr.getSeconds();

    const fttZero = (val) => {
        if (val < 10) return "0" + "" + val;
        return val;
    };

    return { date: `${y}-${m}-${d}`, time: `${fttZero(h)}:${fttZero(min)}:${fttZero(s)}` };
};

export default (props) => {
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [datetime, setTime] = useState("");
    useEffect(() => {
        getTime();
    }, [datetime]);

    const getTime = () => {
        const timeID = setInterval(() => {
            setCurrentTime(Date.now());
            const result = formatData(currentTime);
            setTime(result);
            clearInterval(timeID);
        }, 1000);
    };

    return <div className={styles.mainBox}>
        <div className={styles.welcome}>Hello !</div>
        <div className={styles.date}>{datetime.date}</div>
        <div className={styles.time}>{datetime.time}</div>
    </div>;
};

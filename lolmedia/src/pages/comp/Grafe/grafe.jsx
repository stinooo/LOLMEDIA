import React from "react";
import { BarChart , Bar , XAxis , YAxis , CartesianGrid, Tooltip, Legend , ResponsiveContainer,} from "recharts";

export const Grafe = ({key , matchData , shows}) => {
    const data = [
        {
            name: matchData?.info.participants[0]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[0][shows] : 0,
        },
        {
            name: matchData?.info.participants[1]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[1][shows] : 0,
        },
        {
            name: matchData?.info.participants[2]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[2][shows] : 0,
        },
        {
            name: matchData?.info.participants[3]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[3][shows] : 0,
        },
        {
            name: matchData?.info.participants[4]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[4][shows] : 0,
        },
        {
            name: matchData?.info.participants[5]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[5][shows] : 0,
        },
        {
            name: matchData?.info.participants[6]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[6][shows] : 0,
        },
        {
            name: matchData?.info.participants[7]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[7][shows] : 0,
        },
        {
            name: matchData?.info.participants[8]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[8][shows] : 0,
        },
        {
            name: matchData?.info.participants[9]?.riotIdGameName,
            [shows]: matchData ? matchData.info.participants[9][shows] : 0,
        },];

    return (
        <ResponsiveContainer width="95%" height={400}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    right: 30,
                    left: 20,
                    top:10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />             
                <Legend />
                <Bar dataKey={shows} fill="#8884d8" />
            </BarChart>



        </ResponsiveContainer>

    );
};

export default Grafe;

import React from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { auth } from '@clerk/nextjs/server';
import { BarChartCompanyData, ChartData } from '@/app/Types';



export const CreateBarChartData = async () => {
    let companies : BarChartCompanyData[] = []
    const { userId } = await auth();
    function getPastSixMonthsData() {
        const data: ChartData[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0)

        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthName = date.toLocaleString('ja-JP', { month: 'short' });
            data.push({ month: monthName, applicatons: 0 })
        }
        return data
    }

    try {
        const querySnapShot = await getDocs(collection(db, 'users', `${userId}`, 'company'))
        companies = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            created_at : doc.data().created_at
        }))
        //console.log(`Fetched ${companies.length} companies for chart`);

    } catch (error) {
        console.error("Error fetching companies from Firebase for chart:", error);
    }

    //データ初期化、集計
    const chartData = getPastSixMonthsData();

    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)
    sixMonthsAgo.setHours(0, 0, 0, 0);

    companies.map((company) => {
        const entryDate = company.created_at?.toDate();
        entryDate.setHours(0, 0, 0, 0);
        
        if (entryDate >= sixMonthsAgo && entryDate <= now) {
            const monthName = entryDate.toLocaleString('ja-JP', { month: 'short' });

            const monthEntry = chartData.find(d => d.month === monthName);
            if (monthEntry) {
                monthEntry.applicatons++;
                
            } else {
                console.log(`Entry date ${entryDate} is outside the expected 6-month range for chart data.`)
            }
        }
    })
    //console.log("Chart Data fetching successfully!!!", chartData)
    return chartData
}


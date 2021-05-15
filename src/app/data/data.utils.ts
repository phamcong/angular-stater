export const randomTaskList = (nbTasks: number) => {
    const sectors = ["Education", "Marketing", "IT"]
    const users = [
        "Melissa Fleming", "Christoffer Christiansen", "Valtteri Pulkkinen",
        "Todd Beck", "Kayla Hall", "Jimmie Simmons", "Benedikt Hein",
        "Aloïs Moulin", "Noah Smith", "Noah Dupont", "Necati Nalbantoğlu",
        "Nerea Mendez", "Arnold Gardner", "Julia Cano",
        "Annika Schulte", "Justin Harcourt", 
    ]

    const taskName = {
        Education: ["Assignement mark", "Projets planning", "Scholarship interview"],
        Marketing: ["Review budget planning", "Marketing plan", "Client searching"],
        IT: ["Code review", "Pair programming", "Learning new language", "Check security"]
    }

    const addDate = (nbDates: number) => {
        const today = new Date()
        today.setDate(today.getDate() - nbDates)
        return today
    }

    return Array.from(Array(nbTasks)).map((item, idx) => {
        const sector = sectors[idx % 3]
        const user = users[idx % 16]
        const factor = idx % 3 === 0 ? -100 : 100
        const randomNbDate1 = Math.round(Math.random() * factor)
        const randomNbDate2 = Math.round(Math.random() * factor)
        const taskDate = addDate(randomNbDate1)
        const archivedDate = idx % 2 ? addDate(randomNbDate2) : undefined
        const today = new Date()
        let status
        if (archivedDate && (archivedDate > taskDate)) status = 'Delayed'
        if (!archivedDate && (today < taskDate)) status = 'Upcomming'
        if (!archivedDate && (today > taskDate)) status = 'Pending'
        if (archivedDate && (archivedDate < taskDate)) status = 'Completed'
        return {
            user,
            sector,
            taskName: taskName[sector][idx % 3],
            taskDate: taskDate.toISOString(),
            archivedDate: archivedDate && archivedDate.toISOString(),
            status
        }
    })
}
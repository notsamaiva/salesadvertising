  {/* Affichage du nombre de ventes et des revenus avant le tableau */}

<Box sx={{ marginTop: 3 }}>
<Typography variant="h6" gutterBottom>
  Sales and Revenue Overview
</Typography>
<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <Typography variant="body1">
	<strong>Before Period:</strong> {salesCounts.before} Sales, ${revenues.before.toFixed(2)} Revenue
  </Typography>
  <Typography variant="body1">
	<strong>During Period:</strong> {salesCounts.during} Sales, ${revenues.during.toFixed(2)} Revenue
  </Typography>
  <Typography variant="body1">
	<strong>After Period:</strong> {salesCounts.after} Sales, ${revenues.after.toFixed(2)} Revenue
  </Typography>
</Box>
</Box>




  // Créer les périodes avant, pendant, et après
  const beforeStartDate = new Date(selectedStartDate);
  const afterEndDate = new Date(selectedEndDate);
  const dateDifference = calculateDateDifference(startDateFormatted, endDateFormatted);
  beforeStartDate.setDate(beforeStartDate.getDate() - dateDifference);
  afterEndDate.setDate(afterEndDate.getDate() + dateDifference);

  const beforeStartDateFormatted = formatDate(beforeStartDate);
  const afterEndDateFormatted = formatDate(afterEndDate);

  // Formater les données pour le graphique
  const salesData = [
    { name: `${beforeStartDateFormatted} to ${startDateFormatted}`, sales: salesCounts.before, revenue: revenues.before },
    { name: `${startDateFormatted} to ${endDateFormatted}`, sales: salesCounts.during, revenue: revenues.during },
    { name: `${endDateFormatted} to ${afterEndDateFormatted}`, sales: salesCounts.after, revenue: revenues.after },
  ];
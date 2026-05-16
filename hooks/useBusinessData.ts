import { useAuth } from '@/contexts/AuthContext';
import * as apexRanged from '@/lib/rangedData';
import * as apexMock from '@/lib/mockData';
import * as ridge from '@/lib/blueridgeData';
import * as electric from '@/lib/electricalData';
import * as peak from '@/lib/roofingData';
import type { MonthlyRevenue } from '@/types';

export function useBusinessData() {
  const { business } = useAuth();

  if (business?.id === 'ridge') {
    return {
      stats:            ridge.rangedStats,
      changes:          ridge.rangedChanges,
      revenueChartData: ridge.revenueChartData,
      serviceData:      ridge.rangedServiceData,
      leadSources:      ridge.rangedLeadSources,
      techUtilization:  ridge.rangedTechUtilization,
      customerChart:    ridge.rangedCustomerChart,
      technicians:      ridge.technicians,
      customers:        ridge.customers,
      overdueInvoices:  ridge.overdueInvoices,
      alerts:           ridge.alerts,
      recentJobs:       ridge.recentJobs,
      monthlyRevenue:   ridge.monthlyRevenue as MonthlyRevenue[],
    };
  }

  if (business?.id === 'electric') {
    return {
      stats:            electric.rangedStats,
      changes:          electric.rangedChanges,
      revenueChartData: electric.revenueChartData,
      serviceData:      electric.rangedServiceData,
      leadSources:      electric.rangedLeadSources,
      techUtilization:  electric.rangedTechUtilization,
      customerChart:    electric.rangedCustomerChart,
      technicians:      electric.technicians,
      customers:        electric.customers,
      overdueInvoices:  electric.overdueInvoices,
      alerts:           electric.alerts,
      recentJobs:       electric.recentJobs,
      monthlyRevenue:   electric.monthlyRevenue as MonthlyRevenue[],
    };
  }

  if (business?.id === 'peak') {
    return {
      stats:            peak.rangedStats,
      changes:          peak.rangedChanges,
      revenueChartData: peak.revenueChartData,
      serviceData:      peak.rangedServiceData,
      leadSources:      peak.rangedLeadSources,
      techUtilization:  peak.rangedTechUtilization,
      customerChart:    peak.rangedCustomerChart,
      technicians:      peak.technicians,
      customers:        peak.customers,
      overdueInvoices:  peak.overdueInvoices,
      alerts:           peak.alerts,
      recentJobs:       peak.recentJobs,
      monthlyRevenue:   peak.monthlyRevenue as MonthlyRevenue[],
    };
  }

  return {
    stats:            apexRanged.rangedStats,
    changes:          apexRanged.rangedChanges,
    revenueChartData: apexRanged.revenueChartData,
    serviceData:      apexRanged.rangedServiceData,
    leadSources:      apexRanged.rangedLeadSources,
    techUtilization:  apexRanged.rangedTechUtilization,
    customerChart:    apexRanged.rangedCustomerChart,
    technicians:      apexMock.technicians,
    customers:        apexMock.customers,
    overdueInvoices:  apexMock.overdueInvoices,
    alerts:           apexMock.alerts,
    recentJobs:       apexMock.recentJobs,
    monthlyRevenue:   apexMock.monthlyRevenue,
  };
}

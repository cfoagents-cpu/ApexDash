import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/formatters';
import type { Job, JobStatus } from '@/types';

const statusStyles: Record<JobStatus, string> = {
  completed:    'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800',
  'in-progress':'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800',
  scheduled:    'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800',
  cancelled:    'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800',
};

const statusLabels: Record<JobStatus, string> = {
  completed: 'Completed', 'in-progress': 'In Progress', scheduled: 'Scheduled', cancelled: 'Cancelled',
};

export function JobsTable({ jobs }: { jobs: Job[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Job</TableHead>
          <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Customer</TableHead>
          <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide hidden md:table-cell">Service</TableHead>
          <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide hidden lg:table-cell">Technician</TableHead>
          <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide hidden sm:table-cell">Date</TableHead>
          <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id} className="border-border hover:bg-muted/30">
            <TableCell className="font-mono text-xs text-muted-foreground">{job.id}</TableCell>
            <TableCell className="font-medium text-foreground text-sm">{job.customer}</TableCell>
            <TableCell className="text-muted-foreground text-sm hidden md:table-cell">{job.service}</TableCell>
            <TableCell className="text-muted-foreground text-sm hidden lg:table-cell">{job.technician}</TableCell>
            <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">{job.date}</TableCell>
            <TableCell>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[job.status]}`}>
                {statusLabels[job.status]}
              </span>
            </TableCell>
            <TableCell className="text-right text-sm font-semibold text-foreground">
              {job.value > 0 ? formatCurrency(job.value) : '—'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

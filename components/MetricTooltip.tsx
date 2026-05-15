'use client';

import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MetricTooltipProps {
  formula: string;
  whyItMatters: string;
}

export function MetricTooltip({ formula, whyItMatters }: MetricTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className="text-gray-300 hover:text-blue-500 transition-colors cursor-help inline-flex"
        aria-label="More info"
      >
        <Info className="w-3.5 h-3.5" />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-64 p-3 text-left bg-gray-900 text-white border-gray-700 rounded-lg shadow-lg"
      >
        <p className="text-xs font-semibold text-blue-400 mb-0.5">Formula</p>
        <p className="text-xs text-gray-300 mb-2">{formula}</p>
        <p className="text-xs font-semibold text-blue-400 mb-0.5">
          Why it matters
        </p>
        <p className="text-xs text-gray-300">{whyItMatters}</p>
      </TooltipContent>
    </Tooltip>
  );
}

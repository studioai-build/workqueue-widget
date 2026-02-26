interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  showText?: boolean;
}

export const ProgressBar = ({ value, max, color = 'primary', showText = false }: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    primary: 'bg-primary',
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500'
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{value} of {max}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
};
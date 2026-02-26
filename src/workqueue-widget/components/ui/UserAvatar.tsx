interface UserAvatarProps {
  initials: string;
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UserAvatar = ({ initials, name, color = 'primary', size = 'sm' }: UserAvatarProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const colorClasses = {
    primary: 'bg-primary text-white',
    orange: 'bg-orange-500 text-white',
    blue: 'bg-blue-500 text-white',
    purple: 'bg-purple-500 text-white',
    green: 'bg-green-500 text-white'
  };

  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full font-medium ${sizeClasses[size]} ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`}
      title={name}
    >
      {initials}
    </div>
  );
};
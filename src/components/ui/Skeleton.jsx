import styles from './Skeleton.module.css';

export function Skeleton({ width = '100%', height = 20, radius = 8, className = '' }) {
  return (
    <div className={`${styles.skeleton} ${className}`} style={{ width, height, borderRadius: radius }} />
  );
}

export function ProductSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton height={260} radius={16} />
      <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton height={12} width="50%" />
        <Skeleton height={18} width="80%" />
        <Skeleton height={14} width="35%" />
        <Skeleton height={22} width="45%" />
      </div>
    </div>
  );
}

export default Skeleton;
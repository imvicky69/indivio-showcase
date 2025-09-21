# Firestore Content Bridge System

A comprehensive content synchronization system that bridges local JSON content with Firestore, providing real-time updates, intelligent caching, and configurable rebuild strategies for your Next.js application.

## Features

- 🔄 **Bi-directional sync** between local content and Firestore
- ⚡ **Intelligent caching** with configurable expiration times
- 🚀 **ISR (Incremental Static Regeneration)** with page-specific rebuild times
- 📊 **Real-time monitoring** and performance tracking
- 🔧 **Conflict resolution** with customizable merge strategies
- 🎯 **Priority-based** content management
- 📈 **Performance metrics** and sync analytics
- 🛠️ **Environment-specific** configurations

## Quick Start

### 1. Basic Usage (Backward Compatible)

Your existing code continues to work unchanged:

```typescript
import { useContent } from '../hooks/useContent';

function MyComponent() {
  const { content, hero, features } = useContent();
  
  return (
    <div>
      <h1>{hero.title}</h1>
      <p>{hero.description}</p>
    </div>
  );
}
```

### 2. Enable Firestore Sync

To enable Firestore synchronization, simply add the `useFirestore` option:

```typescript
import { useContent } from '../hooks/useContent';

function MyComponent() {
  const { 
    content, 
    loading, 
    error, 
    syncStatus,
    hero, 
    features 
  } = useContent({ useFirestore: true });

  if (loading) return <div>Loading content...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{hero.title}</h1>
      <p>{hero.description}</p>
      {syncStatus === 'drift' && (
        <div className="warning">Content drift detected!</div>
      )}
    </div>
  );
}
```

### 3. Advanced Firestore Hooks

For more granular control, use the specialized Firestore hooks:

```typescript
import { 
  useFirestoreContent, 
  useContentManager, 
  useContentRevalidation 
} from '../hooks/useFirestoreContent';

function AdminPanel() {
  // Fetch specific content with real-time updates
  const { data: hero, loading, error, refetch } = useFirestoreContent('hero', {
    enableRealtime: true,
    fallbackToLocal: true
  });

  // Content management operations
  const { 
    pushContent, 
    pushAllContent, 
    clearCache, 
    isSyncing 
  } = useContentManager();

  // Revalidation control
  const { 
    checkRevalidation, 
    getRevalidationTime, 
    forceRevalidation 
  } = useContentRevalidation();

  const handleUpdateContent = async () => {
    const success = await pushContent('hero', updatedHeroData);
    if (success) {
      await refetch();
    }
  };

  return (
    <div>
      <button onClick={handleUpdateContent} disabled={isSyncing}>
        {isSyncing ? 'Syncing...' : 'Update Hero Content'}
      </button>
      <button onClick={() => clearCache('hero')}>
        Clear Cache
      </button>
      <button onClick={() => forceRevalidation('hero')}>
        Force Revalidation
      </button>
    </div>
  );
}
```

## Configuration

### Content Sync Configuration

The system uses a configuration file at `src/config/content-sync.config.json`:

```json
{
  "pages": {
    "home": {
      "contentKeys": ["hero", "features", "testimonials"],
      "revalidate": 3600,
      "cacheStrategy": "isr",
      "priority": "high",
      "realtime": false
    }
  },
  "content": {
    "hero": {
      "revalidate": 3600,
      "cacheStrategy": "isr",
      "priority": "high",
      "realtime": false,
      "dependencies": []
    }
  },
  "global": {
    "defaultRevalidate": 3600,
    "enableRealtime": false,
    "collection": "frontend"
  }
}
```

### Environment Configurations

Different settings for different environments:

```json
{
  "environments": {
    "development": {
      "enableRealtime": true,
      "defaultRevalidate": 300,
      "logLevel": "debug"
    },
    "production": {
      "enableRealtime": false,
      "defaultRevalidate": 3600,
      "logLevel": "error"
    }
  }
}
```

## Command Line Tools

### Advanced Sync Script

The enhanced sync script provides powerful content management capabilities:

```bash
# Intelligent bi-directional sync
node scripts/advancedSync.js sync

# Push specific content
node scripts/advancedSync.js push hero features --priority=high

# Pull all content
node scripts/advancedSync.js pull

# Show differences
node scripts/advancedSync.js diff

# Create backup
node scripts/advancedSync.js backup

# Validate content integrity
node scripts/advancedSync.js validate

# Dry run (preview changes)
node scripts/advancedSync.js sync --dry-run

# Force operation (ignore conflicts)
node scripts/advancedSync.js push --force

# Environment-specific operations
node scripts/advancedSync.js sync --env=production
```

### Legacy Scripts (Still Supported)

```bash
# Simple push/pull (legacy)
node scripts/syncContent.js push
node scripts/syncContent.js pull

# Direct push to Firestore
node scripts/pushContentToFirestore.js
```

## Monitoring & Analytics

### Sync Dashboard

Access the real-time monitoring dashboard at `/sync-dashboard`:

- **Performance Metrics**: Request counts, success rates, response times
- **Cache Analytics**: Hit rates, memory usage, cache efficiency
- **Content Metrics**: Access patterns, error rates, revalidation status
- **Event Timeline**: Real-time sync events and operations
- **System Status**: Uptime, last sync, health indicators

### API Endpoints

Monitor your sync operations programmatically:

```typescript
// Get dashboard data
const dashboard = await fetch('/api/sync?action=dashboard');

// Get performance metrics
const metrics = await fetch('/api/sync?action=metrics');

// Get recent events
const events = await fetch('/api/sync?action=events&limit=100');

// Get content-specific metrics
const heroMetrics = await fetch('/api/sync?action=content&key=hero');

// Export events as CSV
const csvData = await fetch('/api/sync?action=export&format=csv');
```

## ISR (Incremental Static Regeneration)

### Page-Level Configuration

Configure ISR settings for each page:

```typescript
// pages/index.tsx
export async function getStaticProps() {
  const content = await contentBridge.getAllContent();
  
  return {
    props: { content },
    revalidate: configManager.getISRConfig('home').revalidate, // From config
  };
}
```

### Content-Level Revalidation

Set different revalidation times for different content types:

```json
{
  "content": {
    "hero": { "revalidate": 3600 },      // 1 hour
    "pricing": { "revalidate": 1800 },   // 30 minutes
    "navigation": { "revalidate": 86400 } // 24 hours
  }
}
```

## Error Handling & Fallbacks

The system provides robust error handling:

```typescript
const { content, error, syncStatus } = useContent({ useFirestore: true });

// Automatic fallback to local content on Firestore errors
if (syncStatus === 'error') {
  console.log('Using local content as fallback');
}

// Handle content drift
if (syncStatus === 'drift') {
  console.log('Local and remote content differ');
}
```

## Best Practices

### 1. Content Priority Management

Set priorities based on business importance:

```json
{
  "hero": { "priority": "high" },     // Critical for user experience
  "features": { "priority": "high" }, // Important product info
  "faq": { "priority": "medium" },    // Helpful but not critical
  "legal": { "priority": "low" }      // Rarely changes
}
```

### 2. Cache Strategy Selection

Choose appropriate caching strategies:

- **`static`**: Rarely changing content (legal pages, contact info)
- **`isr`**: Regularly updated content (features, pricing)
- **`realtime`**: Frequently changing content (announcements, status)

### 3. Dependency Management

Define content dependencies for automatic invalidation:

```json
{
  "whyIndivio": {
    "dependencies": ["features", "testimonials"]
  }
}
```

### 4. Environment-Specific Settings

Use different configurations for different environments:

```bash
# Development: Real-time updates, verbose logging
NODE_ENV=development node scripts/advancedSync.js sync

# Production: Optimized caching, minimal logging
NODE_ENV=production node scripts/advancedSync.js sync
```

## Migration Guide

### From Local-Only to Firestore

1. **Keep existing code unchanged** - everything is backward compatible
2. **Test with Firestore enabled**: `useContent({ useFirestore: true })`
3. **Configure revalidation times** in `content-sync.config.json`
4. **Set up monitoring** at `/sync-dashboard`
5. **Deploy with ISR enabled** using the configuration

### Gradual Migration Strategy

```typescript
// Phase 1: Test on specific pages
const isFirestoreEnabled = process.env.NEXT_PUBLIC_ENABLE_FIRESTORE === 'true';
const { content } = useContent({ useFirestore: isFirestoreEnabled });

// Phase 2: Enable for high-priority content
const { content } = useContent({ 
  useFirestore: ['hero', 'features', 'pricing'].includes(contentKey)
});

// Phase 3: Full migration
const { content } = useContent({ useFirestore: true });
```

## Troubleshooting

### Common Issues

1. **Content Not Syncing**
   - Check Firestore permissions
   - Verify service account key
   - Check network connectivity

2. **Cache Issues**
   - Clear cache: `clearCache()`
   - Check revalidation settings
   - Monitor cache hit rates

3. **Performance Issues**
   - Review revalidation frequencies
   - Optimize content payload sizes
   - Monitor response times

### Debugging

Enable debug logging:

```bash
# Verbose logging
node scripts/advancedSync.js sync --verbose

# Debug environment
NODE_ENV=development node scripts/advancedSync.js sync
```

## Support

- **Monitor**: Visit `/sync-dashboard` for real-time insights
- **Logs**: Check structured logs with filtering
- **Export**: Download sync events as CSV for analysis
- **Validate**: Run `node scripts/advancedSync.js validate` for integrity checks

The Firestore Content Bridge provides a seamless transition from local content to a scalable, cloud-based content management system while maintaining backward compatibility and providing powerful new features for content synchronization and management.
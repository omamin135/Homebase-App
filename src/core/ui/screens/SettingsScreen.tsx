import { useExportBackup } from '../../backup/hooks';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';

export function SettingsScreen() {
  const { status, message, exportBackup } = useExportBackup();

  return (
    <Screen title="Settings">
      <Card>
        <AppText variant="sectionHeading">Backup</AppText>
        <AppText variant="supporting" tone="secondary">
          Export a copy of all your data. Choose where to save it from the share menu, for example
          Drive or Files.
        </AppText>
        <Button
          label={status === 'working' ? 'Preparing…' : 'Export database'}
          onPress={exportBackup}
          disabled={status === 'working'}
        />
        {status === 'done' ? (
          <AppText variant="supporting" tone="secondary">
            Exported {message}
          </AppText>
        ) : null}
        {status === 'error' ? (
          <AppText variant="supporting" tone="danger">
            Export failed: {message}
          </AppText>
        ) : null}
      </Card>
    </Screen>
  );
}

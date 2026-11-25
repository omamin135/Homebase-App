import { useCallback, useState } from 'react';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { sqliteBackupRepository } from './repository';
import { createBackupService } from './service';

const backupService = createBackupService(sqliteBackupRepository);

type ExportState = { status: 'idle' | 'working' | 'done' | 'error'; message?: string };

// Writes a snapshot to the cache folder and opens the Android share sheet.
export function useExportBackup() {
  const [state, setState] = useState<ExportState>({ status: 'idle' });

  const exportBackup = useCallback(async () => {
    setState({ status: 'working' });
    try {
      if (!(await Sharing.isAvailableAsync())) {
        throw new Error('Sharing is not available on this device.');
      }
      const { fileName, bytes } = await backupService.createExport();
      const file = new File(Paths.cache, fileName);
      file.create({ overwrite: true });
      file.write(bytes);
      await Sharing.shareAsync(file.uri, {
        mimeType: 'application/octet-stream',
        dialogTitle: 'Export Homebase backup',
      });
      setState({ status: 'done', message: fileName });
    } catch (e) {
      setState({ status: 'error', message: e instanceof Error ? e.message : String(e) });
    }
  }, []);

  return { ...state, exportBackup };
}

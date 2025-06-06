import { PageAgent, type PageAgentOpt } from '@midscene/web/agent';
import { AndroidDevice } from '../page';

import { vlLocateMode } from '@midscene/shared/env';
import { getConnectedDevices } from '../utils';

import { debugPage } from '../page';

export class AndroidAgent extends PageAgent<AndroidDevice> {
  constructor(page: AndroidDevice, opts?: PageAgentOpt) {
    super(page, opts);

    if (!vlLocateMode()) {
      throw new Error(
        'Android Agent only supports vl-model. https://midscenejs.com/choose-a-model.html',
      );
    }
  }

  async launch(uri: string): Promise<void> {
    const device = this.page;
    await device.launch(uri);
  }
}

export async function agentFromAdbDevice(
  deviceId?: string,
  opts?: PageAgentOpt,
) {
  if (!deviceId) {
    const devices = await getConnectedDevices();

    deviceId = devices[0].udid;

    debugPage(
      'deviceId not specified, will use the first device (id = %s)',
      deviceId,
    );
  }

  const page = new AndroidDevice(deviceId);

  await page.connect();

  return new AndroidAgent(page, opts);
}

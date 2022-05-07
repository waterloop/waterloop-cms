import renameProps from '../utils/rename-props';
import {parseTimeForResponse} from '../utils/db-dates';

export const fromGooseInfo = (gooseInfo) => renameProps(gooseInfo, {
    updatedAt: 'updated_at'
  });

export const toGooseInfo = (gooseInfo) => ({
  ...renameProps(gooseInfo, {
    updated_at: 'updatedAt'
  }),
  updatedAt: parseTimeForResponse(gooseInfo.updated_at)
});

export const fromGooseImage = (gooseImage) => renameProps(gooseImage, {
  gooseId: "goose_id",
  imgDir: "img_dir"
});
export const toGooseImage = (gooseImage) => renameProps(gooseImage, {
  goose_id: "gooseId",
  img_dir: "imgDir"
});

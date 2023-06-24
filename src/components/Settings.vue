<script lang="ts" setup>
import { VTextField, VDialog, VCard, VBtn, VBtnGroup } from 'vuetify/components';
import useStore from '../store';
import useVoteStore from '../store/vote';
import ConfigImportExport from './ConfigImportExport.vue';
import EditCandidates from './EditCandidates.vue';
import { mdiFileArrowLeftRightOutline, mdiLockReset } from '@mdi/js';

const store = useStore();
const voteStore = useVoteStore();

function show_config() {
  store.showImportExport = true;
}

function show_edit_candidates() {
  store.showEditCandidates = true;
}
</script>

<template>
  <v-dialog v-model="store.showSettings" :scrollable="true">
    <v-card>
      <template #title>设置</template>
      <template #default>
        <v-text-field label="主题" v-model="store.subject"></v-text-field>
        <v-text-field type="number" min="1" label="名次分隔线" hint="此名次及以上的可视作成功"
          v-model="store.rankSepWrapper"></v-text-field>
        <v-text-field type="number" min="3" label="历史记录显示个数" hint="太远的历史记录会被储存，但不被展示"
          v-model="voteStore.countVisibleHistory"></v-text-field>
        <v-btn-group divided>
          <v-btn color="primary" variant="outlined" @click="show_edit_candidates()">编辑人员</v-btn>
          <v-btn color="primary" @click="show_config()" :prepend-icon="mdiFileArrowLeftRightOutline" variant="outlined">
            导入/导出/查看配置</v-btn>
          <v-btn color="error" @click="store.clear_vote_progress()" :prepend-icon="mdiLockReset" variant="outlined">
            重置投票进度（所有票数、排名）</v-btn>
        </v-btn-group>
      </template>
    </v-card>
    <config-import-export></config-import-export>
    <edit-candidates></edit-candidates>
  </v-dialog>
</template>

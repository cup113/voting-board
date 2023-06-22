<script lang="ts" setup>
import { VTextField, VDialog, VCard, VBtn, VBtnGroup } from 'vuetify/components';
import useStore from '../store';
import useVoteStore from '../store/vote';
import ConfigImportExport from './ConfigImportExport.vue';

const store = useStore();
const voteStore = useVoteStore();
// 设置内容：
// 3. 编辑人员 (批量增 删 改 按名次批量删) // TODO
// 7. 导出/导入 // TODO 序列化问题

function show_config() {
  store.showImportExport = true;
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
        <v-btn-group>
          <v-btn color="primary" @click="show_config">导入/导出/查看配置</v-btn>
          <v-btn color="error" @click="store.clear_vote_progress">重置投票进度（所有票数、排名）</v-btn>
        </v-btn-group>
      </template>
    </v-card>
    <config-import-export></config-import-export>
  </v-dialog>
</template>

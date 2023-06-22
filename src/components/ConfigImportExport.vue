<script lang="ts" setup>
import { VDialog, VCard, VCardTitle, VTextField, VTextarea } from 'vuetify/components';
import useStore from '../store';
import { computed } from 'vue';
import sha256 from 'crypto-js/sha256'

const store = useStore();
const json = computed(() => store.export_data());
const hash = computed(() => sha256(json.value));
</script>

<template>
  <v-dialog v-model="store.showImportExport">
    <v-card>
      <template #title>
        <v-card-title>数据导入/导出</v-card-title>
      </template>
      <template #default>
        <v-text-field label="摘要 (SHA256 Hash)" :readonly="true" :model-value="hash"></v-text-field>
        <v-textarea label="数据内容 (JSON)" v-model="json" auto-grow></v-textarea>
      </template>
    </v-card>
  </v-dialog>
</template>

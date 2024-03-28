{{- define "project.electric.labels" -}}
{{ include "project.electric.matchLabels" . }}
{{ include "project.common.metaLabels" . }}
{{- end -}}

{{- define "project.electric.matchLabels" -}}
app.kubernetes.io/component: {{ .Values.electric.name | quote }}
{{ include "project.common.matchLabels" . }}
{{- end -}}

{{- define "electric.image" -}}
{{ include "common.images.image" (dict "imageRoot" .Values.electric.image "global" .Values.global) }}
{{- end -}}

{{- define "project.electric.fullname" -}}
{{- if .Values.electric.fullnameOverride -}}
{{- .Values.electric.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- printf "%s-%s" .Release.Name .Values.electric.name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s-%s" .Release.Name $name .Values.electric.name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "project.frontend.matchLabels" -}}
app.kubernetes.io/component: {{ .Values.frontend.name | quote }}
{{ include "project.common.matchLabels" . }}
{{- end -}}

{{- define "project.frontend.labels" -}}
{{ include "project.frontend.matchLabels" . }}
{{ include "project.common.metaLabels" . }}
{{- end -}}

{{/*
Return the proper image names
*/}}
{{- define "frontend.image" -}}
{{ include "common.images.image" (dict "imageRoot" .Values.frontend.image "global" .Values.global) }}
{{- end -}}
{{- define "frontend.imagePullSecrets" -}}
{{ include "common.images.pullSecrets" (dict "images" (list .Values.frontend.image) "global" .Values.global) }}
{{- end -}}

{{/*
Create a fully qualified project name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}

{{- define "project.frontend.fullname" -}}
{{- if .Values.frontend.fullnameOverride -}}
{{- .Values.frontend.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- printf "%s-%s" .Release.Name .Values.frontend.name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s-%s" .Release.Name $name .Values.frontend.name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Other helper functions
*/}}
{{- define "project.frontend.reallyFullname" -}}
{{- $fullname := include "project.frontend.fullname" . -}}
{{- printf "%s.%s.%s" $fullname .Release.Namespace "svc.cluster.local" -}}
{{- end -}}

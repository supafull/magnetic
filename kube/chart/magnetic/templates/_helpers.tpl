{{/* vim: set filetype=mustache: */}}

{{/*
Expand the name of the chart.
*/}}
{{- define "project.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "project.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create unified labels for project components
*/}}
{{- define "project.common.matchLabels" -}}
app.kubernetes.io/app: {{ template "project.name" . }}
app.kubernetes.io/release: {{ .Release.Name }}
{{- end -}}

{{- define "project.common.metaLabels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
helm.sh/heritage: {{ .Release.Service }}
{{- end -}}

{{- define "project.common.labels" -}}
{{ include "project.common.matchLabels" . }}
{{ include "project.common.metaLabels" . }}
{{- end -}}

{{/*
Create the name of the service account to use for the project component
*/}}
{{- define "project.serviceAccountName.project" -}}
{{- if .Values.serviceAccounts.project.create -}}
    {{ default (include "project.fullname" .) .Values.serviceAccounts.project.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccounts.project.name }}
{{- end -}}
{{- end -}}

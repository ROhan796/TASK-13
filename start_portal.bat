@echo off
set NODE_EXTRA_CA_CERTS=C:\INTERNSHIP_TASK\TASK16\Fullstack_Unification\aai-wms-backend\certs\ca\ca.crt
set NODE_TLS_REJECT_UNAUTHORIZED=0
cd /d C:\INTERNSHIP_TASK\TASK16\Fullstack_Unification\aai-unified-portal
npx next dev --webpack --port 3000

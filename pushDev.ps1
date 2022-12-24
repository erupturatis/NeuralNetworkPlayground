param (
  [string]$m = "misc changes"
)
Write-Host "Started pushing with message " + $m


git add .
git commit -m $m
git push origin developer
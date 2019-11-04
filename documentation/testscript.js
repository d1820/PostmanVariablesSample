var userOverrides = pm.response.json();

userOverrides.forEach(function(item) {
    pm.environment.set(item.key, item.value);
});
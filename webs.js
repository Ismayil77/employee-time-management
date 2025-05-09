
        $(document).ready(function() {
            // Sample avatar data with IDs
            const avatars = [
                { id: 1, gender: 'men' },
                { id: 2, gender: 'women' },
                { id: 3, gender: 'men' },
                { id: 4, gender: 'women' },
                { id: 5, gender: 'men' },
                { id: 6, gender: 'women' },
                { id: 7, gender: 'men' },
                { id: 8, gender: 'women' },
                { id: 9, gender: 'men' },
                { id: 10, gender: 'women' },
                { id: 32, gender: 'men' }, // Default avatar
                { id: 33, gender: 'women' }
            ];

            // Generate avatar options
            const avatarOptionsContainer = $('#avatar-options');
            avatars.forEach(avatar => {
                const avatarUrl = `https://randomuser.me/api/portraits/${avatar.gender}/${avatar.id}.jpg`;
                avatarOptionsContainer.append(`
                    <div class="avatar-option" data-id="${avatar.id}" data-gender="${avatar.gender}">
                        <img src="${avatarUrl}" alt="Avatar ${avatar.id}">
                    </div>
                `);
            });

            // Set default selected avatar
            $('.avatar-option[data-id="32"]').addClass('selected');

            // Avatar selection handler
            $(document).on('click', '.avatar-option', function() {
                const avatarId = $(this).data('id');
                const avatarGender = $(this).data('gender');
                const avatarUrl = `https://randomuser.me/api/portraits/${avatarGender}/${avatarId}.jpg`;
                
                // Update selected avatar
                $('.avatar-option').removeClass('selected');
                $(this).addClass('selected');
                $('#selected-avatar-id').val(avatarId);
                
                // Update header avatar preview
                $('#header-avatar').attr('src', avatarUrl);
                
                // Here you would typically save the avatar ID to your database
                console.log(`Selected avatar ID: ${avatarId}`);
            });

            // Form submission handler
            $('#user-profile-form').on('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const userName = $('#user-name').val();
                const userAge = $('#user-age').val();
                const userOccupation = $('#user-occupation').val();
                const userEmail = $('#user-email').val();
                const avatarId = $('#selected-avatar-id').val();
                
                // Update header with new user info
                $('#header-username').text(userName);
                
                // Here you would typically send this data to your server
                const userData = {
                    name: userName,
                    age: userAge,
                    occupation: userOccupation,
                    email: userEmail,
                    avatarId: avatarId
                };
                
                console.log('Saving user data:', userData);
                
                // Show success message
                alert('Profile saved successfully!');
            });

            // Update clock
            function updateClock() {
                const now = new Date();
                const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
                
                $('#current-date').text(now.toLocaleDateString('en-US', dateOptions));
                $('#current-time').text(now.toLocaleTimeString('en-US', timeOptions));
            }
            
            updateClock();
            setInterval(updateClock, 1000);
            
            // Tab change handler
            $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
                const activeTab = $(e.target).attr('href');
                if (activeTab === '#dashboard') {
                    $('#page-title').text('Dashboard');
                } else if (activeTab === '#time-details') {
                    $('#page-title').text('Time Details');
                } else if (activeTab === '#user-details') {
                    $('#page-title').text('User Details');
                }
            });
            
            // Button click effects
            $('#clock-in-btn, #clock-out-btn, #break-in-btn, #break-out-btn').on('click', function() {
                const btn = $(this);
                btn.addClass('active');
                setTimeout(() => {
                    btn.removeClass('active');
                }, 200);
                
                // Show notification
                let message = '';
                if (btn.attr('id') === 'clock-in-btn') message = 'Clocked in successfully!';
                if (btn.attr('id') === 'clock-out-btn') message = 'Clocked out successfully!';
                if (btn.attr('id') === 'break-in-btn') message = 'Break started!';
                if (btn.attr('id') === 'break-out-btn') message = 'Break ended!';
                
                alert(message);
            });
            
            // Initialize Monthly Break Chart
            const monthlyBreakCtx = document.getElementById('monthlyBreakChart').getContext('2d');
            const monthlyBreakChart = new Chart(monthlyBreakCtx, {
                type: 'bar',
                data: {
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
                    datasets: [{
                        label: 'Break Time (minutes)',
                        data: [15, 20, 25, 18, 30, 22, 28, 20, 25, 18, 22, 30, 25, 20, 18, 25, 30, 22, 18, 25, 20, 28, 25, 22, 18, 30, 25, 20, 22, 18],
                        backgroundColor: 'rgba(67, 97, 238, 0.7)',
                        borderColor: 'rgba(67, 97, 238, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.parsed.y + ' minutes';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Minutes'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Day of Month'
                            }
                        }
                    }
                }
            });
            
            // Initialize Break Pie Chart
            const breakPieOptions = {
                series: [35, 25, 40],
                chart: {
                    type: 'donut',
                    height: 300
                },
                labels: ['Morning Break', 'Lunch Break', 'Afternoon Break'],
                colors: ['#4361ee', '#4cc9f0', '#f72585'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                total: {
                                    show: true,
                                    label: 'Total',
                                    formatter: function(w) {
                                        return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + ' min';
                                    }
                                }
                            }
                        }
                    }
                }
            };
            
            const breakPieChart = new ApexCharts(document.querySelector("#breakPieChart"), breakPieOptions);
            breakPieChart.render();
        });